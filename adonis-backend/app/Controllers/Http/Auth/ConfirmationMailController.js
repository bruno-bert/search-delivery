"use strict";

const User = use("App/Models/User");
const Env = use("Env");
const Config = use("Config");
const randomString = require("random-string");

const Queue = require("../../../Jobs/Queue");

const requiresAccountActivation =
  Config.get("auth.extends.requiresAccountActivation") === "true";

class ConfirmationMailController {
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
      name: user.name,
      email: user.email,
      url: `${Env.get("APP_URL")}/register/confirm/${user.confirmation_token}`
    };

    /** add job to re-send mail to confirm account */
    await Queue.add("RegistrationMail", { mailData });

    return response.status(200).json({
      user: { name: user.name, email: user.email, isActive: user.isActive },
      message: "ok"
    });
  }
}

module.exports = ConfirmationMailController;
