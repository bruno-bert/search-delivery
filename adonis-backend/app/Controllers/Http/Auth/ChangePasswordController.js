"use strict";

const User = use("App/Models/User");
const { validateAll } = use("Validator");
const Mail = use("Mail");
const Env = use("Env");
const Hash = use("Hash");

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

module.exports = ChangePasswordController;
