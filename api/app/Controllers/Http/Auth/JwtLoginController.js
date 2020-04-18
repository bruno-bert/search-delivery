"use strict";

const User = use("App/Models/User");
const { validateAll } = use("Validator");

class JwtLoginController {
  async login({ request, auth, response }) {
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

      let token = null;
      try {
        token = await auth.attempt(email, password);
      } catch (e) {
        return response.status(400).json({ message: e.message });
      }

      return response.status(200).json({
        user: { email, name, is_active: user.is_active },
        token: token.token,
        message: "user logged in sucessfully"
      });
    }
  }
}

module.exports = JwtLoginController;
