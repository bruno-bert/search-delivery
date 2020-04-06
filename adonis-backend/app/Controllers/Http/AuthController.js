"use strict";

const User = use("App/Models/User");
const { validateAll } = use("Validator");
const Mail = use("Mail");
const Env = use("Env");
const randomString = require("random-string");

class AuthController {
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
  }

  async authenticate({ request, auth, response }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }
}

module.exports = AuthController;
