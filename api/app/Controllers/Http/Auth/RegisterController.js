"use strict";

const User = use("App/Models/User");
const { validateAll } = use("Validator");
const Env = use("Env");
const Config = use("Config");
const randomString = require("random-string");

const Queue = require("../../../Jobs/Queue");

const requiresAccountActivation =
  Config.get("auth.extends.requiresAccountActivation") === "true";

class RegisterController {
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
      is_active: requiresAccountActivation ? false : true,
      confirmation_token
    });
    /** END - user creation */

    /** add job to send confirmation/creation email */
    const mailData = {
      name: result.name,
      email: result.email,
      url: requiresAccountActivation
        ? `${Env.get("APP_URL")}/register/confirm/${confirmation_token}`
        : callbackUrl
    };
    await Queue.add(
      requiresAccountActivation ? "RegistrationMail" : "AccountCreationMail",
      { mailData }
    );
    /** END -  add job to send confirmation/creation email */

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
        is_active: result.is_active
      },
      message: "user registered sucessfully"
    });
  }

  async confirmAccount({ params, response }) {
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
    user.is_active = true;

    // persist user to database
    await user.save();

    response.status(200).json({
      user: { name: user.name, email: user.email, is_active: user.is_active },
      message: "account confirmed successfully"
    });

    //** TODO - redirecionar para caminho no cliente */
  }
}

module.exports = RegisterController;
