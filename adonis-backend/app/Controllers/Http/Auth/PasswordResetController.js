"use strict";

const User = use("App/Models/User");
const { validateAll } = use("Validator");
const Mail = use("Mail");
const Env = use("Env");
const randomString = require("random-string");

class PasswordResetController {
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
}

module.exports = PasswordResetController;
