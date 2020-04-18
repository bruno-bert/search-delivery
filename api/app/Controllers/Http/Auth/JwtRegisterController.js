"use strict";

const User = use("App/Models/User");
const { validateAll } = use("Validator");
const Env = use("Env");
const Config = use("Config");
const randomString = require("random-string");

const Queue = require("../../../Jobs/Queue");

const requiresAccountActivation =
  Config.get("auth.extends.requiresAccountActivation") === "true";

class JwtRegisterController {
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
    let token = null;
    try {
      token = await auth.attempt(data.email, data.password);
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
      token: token.token,
      message: "user registered sucessfully"
    });
  }
}

module.exports = JwtRegisterController;
