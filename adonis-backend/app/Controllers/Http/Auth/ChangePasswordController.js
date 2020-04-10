"use strict";

const User = use("App/Models/User");
const { validateAll } = use("Validator");
const Env = use("Env");
const Hash = use("Hash");

const Queue = require("../../../Jobs/Queue");

class ChangePasswordController {
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
      name: user.name,
      email: user.email,
      support_mail: Env.get("MAIL_SUPPORT")
    };

    /** add job to send change passowrd awareness mail  */
    await Queue.add("ChangePasswordMail", { mailData });

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

module.exports = ChangePasswordController;
