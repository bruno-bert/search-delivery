"use strict";

const User = use("App/Models/User");
const { validateAll } = use("Validator");
const Mail = use("Mail");
const Env = use("Env");
const Config = use("Config");
const randomString = require("random-string");
const Hash = use("Hash");

const requiresAccountActivation =
  Config.get("auth.extends.requiresAccountActivation") === "true";

class AuthController {
  async authenticate({ request, auth, response }) {
    const data = request.only(["email", "password", "name"]);
    const { email, password, name } = data;

    const rules = {
      email: "required|email",
      password: "required"
    };

    const validation = await validateAll(data, rules);
    if (validation.fails()) {
      return response.status(400).json({ message: validation.messages() });
    }

    const user = await User.findBy("email", email);
    if (!user) {
      return response.status(400).json({ message: "invalid user" });
    } else {
      if (user.provider !== "mail")
        return response.status(400).json({
          message:
            "user account registered needs to login by using the provider " +
            user.provider
        });

      try {
        await auth.remember(true).attempt(email, password);
      } catch (e) {
        return response.status(400).json({ message: e.message });
      }

      return response.status(200).json({
        user: { email, name, isActive: user.isActive },
        message: "user logged in sucessfully"
      });
    }
  }

  async logout({ auth, response }) {
    const user = auth.user;

    try {
      await auth.logout();
    } catch (e) {
      return response
        .status(400)
        .json({ message: "error on trying to logout: " + e.message });
    }

    /** returns the logged out user info and a message */
    return response.status(200).json({
      user: { email: user.email, name: user.name, isActive: user.isActive },
      message: "user logged out sucessfully"
    });
  }

  async sendConfirmationEmail({ response, auth }) {
    const authUser = await auth.getUser();
    const { email } = authUser;

    /** checks if user exists  */
    const user = await User.findBy("email", email);
    if (!user) {
      return response.status(400).json({
        message: `user not found`
      });
    }

    /** checks if user is already active  */
    if (user.isActive)
      return response.status(400).json({
        message: `user is already active`
      });

    /** checks if user provider is mail  */
    if (user.provider !== "mail")
      return response.status(400).json({
        message: `user account provider ${user.provider} does not allow this action`
      });

    /** on each request from client to send the confirmation email, regenerates the confirmation token */
    const confirmation_token = randomString({ length: 40 });

    user.merge({
      confirmation_token
    });
    await user.save();

    const mailData = {
      ...user,
      mailTo: user.email,
      url: `${Env.get("APP_URL")}/register/confirm/${user.confirmation_token}`
    };

    const result = await this._sendConfirmationEmail(mailData);

    if (!result.error) {
      return response
        .status(200)
        .json({
          user: { name: user.name, email: user.email, isActive: user.isActive },
          message: result.message
        });
    } else {
      return response
        .status(400)
        .json({
          user: { name: user.name, email: user.email, isActive: user.isActive },
          message: result.message
        });
    }
  }

  async _sendConfirmationEmail(mailData) {
    /** sends confirmation email */

    /** TODO: change to job */
    try {
      await Mail.send(
        requiresAccountActivation ? "confirm_email" : "creation_email",
        mailData,
        message => {
          message
            .from(Env.get("MAIL_FROM"))
            .to(mailData.mailTo)
            .subject(
              requiresAccountActivation
                ? Env.get("MAIl_CONFIRM_SUBJECT")
                : Env.get("MAIl_CREATION_SUBJECT")
            );
        }
      );

      return { error: false, message: "mail sent successfully" };
    } catch (e) {
      console.log("error on trying to send email: " + e.message);
      return { error: true, message: e.message };
    }
    /** END - sends confirmation email */
  }

  async register({ request, response, auth }) {
    const data = request.only(["name", "email", "provider", "password"]);

    let { callbackUrl } = request.only(["callbackUrl"]);
    if (!callbackUrl) callbackUrl = Env.get("CLIENT_URL");

    // validate form inputs
    const rules = {
      email: "required|email|unique:users,email",
      password: "required|confirmed|min:6"
    };

    const validation = await validateAll(request.all(), rules);

    if (validation.fails()) {
      return response.status(400).json({ message: validation.messages() });
    }

    /** creates the user on database (activates the user or not depending on global configuration 'requiresAccountActivation' */
    const confirmation_token = requiresAccountActivation
      ? randomString({ length: 40 })
      : null;

    const result = await User.create({
      ...data,
      provider: data.provider || "mail",
      isActive: requiresAccountActivation ? false : true,
      confirmation_token
    });
    /** END - user creation */

    /** sends confirmation/creation email */
    const mailData = {
      ...result,
      mailTo: result.email,
      url: requiresAccountActivation
        ? `${Env.get("APP_URL")}/register/confirm/${confirmation_token}`
        : callbackUrl
    };
    await this._sendConfirmationEmail(mailData);
    /** END - sends confirmation/creation email */

    /** login after creation */
    try {
      await auth.remember(true).attempt(data.email, data.password);
    } catch (e) {
      return response.status(400).json({ message: e.message });
    }
    /** END - login */

    return response.status(200).json({
      user: {
        name: data.name,
        email: data.email,
        isActive: result.isActive
      },
      message: "user registered sucessfully"
    });
  }

  async sendResetLinkEmail({ request, response }) {
    const data = request.only(["email", "callbackUrl"]);

    // validate form inputs
    const rules = {
      email: "required|email",
      callbackUrl: "required|url"
    };

    const validation = await validateAll(data, rules);

    if (validation.fails()) {
      return response.status(400).json({ message: validation.messages() });
    }

    // get user with the confirmation token
    const user = await User.findBy("email", data.email);

    if (!user) {
      return response.status(401).json({ message: "user not found" });
    }

    if (user.provider !== "mail")
      return response.status(400).json({
        message: `user account provider ${user.provider} does not allow this action`
      });

    const reset_token = randomString({ length: 40 });
    user.merge({ reset_token });
    await user.save();

    // send reset email
    //the link in the email is to the client application
    const mailData = {
      ...user,
      url: `${data.callbackUrl}/${reset_token}`
    };

    /** TODO: change to job */
    try {
      await Mail.send("reset_password", mailData, message => {
        message
          .from(Env.get("MAIL_FROM"))
          .to(data.email)
          .subject("Busca Delivery - Reset de Senha");
      });
    } catch (e) {
      return response.status(400).json({ message: e.message });
    }

    return response.status(200).json({
      user: {
        name: data.name,
        email: data.email
      },
      message: "reset mail sent successfully"
    });
  }

  async confirmEmail({ params, response }) {
    // get user with the confirmation token
    const user = await User.findBy("confirmation_token", params.token);

    if (!user) {
      return response
        .status(400)
        .json({ message: "confirmation token is invalid" });
    }

    if (user.provider !== "mail")
      return response.status(400).json({
        message: `user account provider ${user.provider} does not allow this action`
      });

    // set confirmation to null and is_active to true
    user.confirmation_token = null;
    user.isActive = true;

    // persist user to database
    await user.save();

    response.status(200).json({
      user: { name: user.name, email: user.email, isActive: user.isActive },
      message: "account confirmed successfully"
    });

    //** TODO - redirecionar para caminho no cliente */
  }

  async confirmPasswordReset({ request, response }) {
    const data = request.only(["email", "reset_token", "password"]);

    // validate form inputs
    const rules = {
      email: "required|email",
      password: "required|confirmed|min:6",
      reset_token: "required"
    };

    const validation = await validateAll(request.all(), rules);

    if (validation.fails()) {
      return response.status(400).json({ message: validation.messages() });
    }

    const userExists = await User.findBy("email", data.email);
    if (!userExists) {
      return response.status(401).json({ message: "user not found" });
    }

    if (userExists.provider !== "mail")
      return response.status(400).json({
        message: `user account provider ${userExists.provider} does not allow this action`
      });

    // get user with the confirmation token from request body
    const userWithToken = await User.findBy("reset_token", data.reset_token);
    if (!userWithToken) {
      return response.status(400).json({ message: "reset token is invalid" });
    }

    // set reset_token to null
    userWithToken.merge({ reset_token: null, password: data.password });

    // persist user to database
    await userWithToken.save();

    response.status(200).json({
      user: {
        name: userWithToken.name,
        email: userWithToken.email,
        isActive: userWithToken.isActive
      },
      message: "password reset successfully"
    });

    //** TODO - redirecionar para caminho no cliente */
  }

  async changePassword({ request, response, auth }) {
    const data = request.only(["email", "password", "old_password"]);

    // validate form inputs
    const rules = {
      email: "required|email",
      password: "required|confirmed|min:6",
      old_password: "required"
    };

    const validation = await validateAll(request.all(), rules);
    if (validation.fails()) {
      return response.status(400).json({ message: validation.messages() });
    }

    if (data.old_password === data.password) {
      return response
        .status(400)
        .json({ message: "new password cannot be the same" });
    }

    const user = await User.findBy("email", data.email);

    if (!user) {
      return response.status(401).json({ message: "user not found" });
    }

    if (!user.isActive) {
      return response
        .status(400)
        .json({ message: "user is not active - cannot change password" });
    }

    if (user.provider !== "mail")
      return response.status(400).json({
        message: `user account provider ${user.provider} does not allow this action`
      });

    /** checks password */
    const isSame = await Hash.verify(data.old_password, user.password);
    if (!isSame)
      return response.status(400).json({ message: "invalid password" });

    user.merge({ password: data.password, reset_token: null });

    await user.save();

    // send change password email - this mail is only a awareness to user
    const mailData = {
      ...user,
      mail: Env.get("MAIL_SUPPORT")
    };

    /** TODO: change to job */
    try {
      await Mail.send("change_password", mailData, message => {
        message
          .from(Env.get("MAIL_FROM"))
          .to(user.email)
          .subject("Busca Delivery - Aviso de Troca de Senha");
      });
    } catch (e) {
      return response.status(400).json({ message: e.message });
    }

    response.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        isActive: user.isActive
      },
      message: "password changed sucessfully"
    });
  }
}

module.exports = AuthController;
