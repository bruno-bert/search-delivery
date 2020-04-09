"use strict";

const User = use("App/Models/User");
const Mail = use("Mail");
const Env = use("Env");
const Config = use("Config");
const randomString = require("random-string");

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
      ...user,
      mailTo: user.email,
      url: `${Env.get("APP_URL")}/register/confirm/${user.confirmation_token}`
    };

    const result = await this._sendConfirmationEmail(mailData);

    if (!result.error) {
      return response.status(200).json({
        user: { name: user.name, email: user.email, isActive: user.isActive },
        message: result.message
      });
    } else {
      return response.status(400).json({
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
}

module.exports = ConfirmationMailController;
