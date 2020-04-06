"use strict";

const User = use("App/Models/User");
const { validateAll } = use("Validator");
const Mail = use("Mail");
const Env = use("Env");
const randomString = require("random-string");

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
      return response.status(400).json(validation.messages());
    }

    const token = await auth.attempt(email, password);

    /** returns the logged user info + token */
    const user = await User.findBy("email", email);
    return { email, name, isActive: user.isActive, token: token.token };
  }

  async register({ request, response, session }) {
    const data = request.only(["name", "email", "provider", "password"]);

    // validate form inputs
    const rules = {
      email: "required|email|unique:users,email",
      password: "required|confirmed|min:6"
    };
    const validation = await validateAll(request.all(), rules);

    if (validation.fails()) {
      return response.status(400).json(validation.messages());
    }

    const confirmation_token = randomString({ length: 40 });

    const result = await User.create({
      ...data,
      provider: data.provider || "mail",
      isActive: false,
      confirmation_token
    });

    // send confirmation email

    const mailData = {
      ...result,
      url: `${Env.get("APP_URL")}/register/confirm/${confirmation_token}`
    };

    /** TODO: change to job */
    try {
      await Mail.send("confirm_email", mailData, message => {
        message
          .from(Env.get("MAIL_FROM"))
          .to(result.email)
          .subject("Busca Delivery - Confirmação de Conta");
      });
    } catch (e) {
      const user = await User.findOrFail(result.id);
      user.delete();
      return response.status(400).json(e.message);
    }

    return {
      name: data.name,
      email: data.email,
      isActive: result.isActive
    };
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
      return response.status(400).json(validation.messages());
    }

    // get user with the confirmation token
    const user = await User.findBy("email", data.email);

    if (!user) {
      return response.status(401).json({ message: "user not found" });
    }

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
      return response.status(400).json(e.message);
    }

    return response.status(200).json({
      name: data.name,
      email: data.email,
      message: "Email de reset de senha enviado com sucesso"
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

    // set confirmation to null and is_active to true
    user.confirmation_token = null;
    user.isActive = true;

    // persist user to database
    await user.save();

    response.status(200).json({ message: "Conta confirmada com sucesso" });

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
      return response.status(400).json(validation.messages());
    }

    const userExists = await User.findBy("email", data.email);
    if (!userExists) {
      return response.status(400).json({ message: "user does not exist" });
    }

    // get user with the confirmation token from request body
    const userWithToken = await User.findBy("reset_token", data.reset_token);
    if (!userWithToken) {
      return response.status(400).json({ message: "reset token is invalid" });
    }

    // set reset_token to null
    userWithToken.merge({ reset_token: null, password: data.password });

    // persist user to database
    await userWithToken.save();

    response.status(200).json({ message: "Senha resetada com sucesso" });

    //** TODO - redirecionar para caminho no cliente */
  }
}

module.exports = AuthController;
