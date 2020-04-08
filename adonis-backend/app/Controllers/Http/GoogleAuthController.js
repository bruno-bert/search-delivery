"use strict";

const User = use("App/Models/User");
const provider = "google";

class GoogleAuthController {
  async login({ ally, auth }) {
    try {
      await auth.check();
    } catch (e) {}

    await ally.driver(provider).redirect();
  }

  async callback({ ally, auth, response }) {
    const allyUser = await ally.driver(provider).getUser();
    const {
      _userFields: { name, email }
    } = allyUser;

    const userExists = await User.findBy("email", email);
    if (userExists) {
      if (userExists.provider === "mail")
        return response.status(400).json({
          message: "user already exists and authenticate by email"
        });

      if (userExists.provider === provider) {
        await auth.login(userExists);

        return response.status(200).json({
          user: {
            name: userExists.name,
            isActive: userExists.isActive,
            email: userExists.email
          },
          message: "user logged in sucessfully"
        });
      }
    } else {
      const userCreated = await User.create({
        name,
        email,
        provider,
        isActive: true,
        password: ""
      });

      await auth.login(userCreated);

      return response.status(200).json({
        user: {
          name: userCreated.name,
          isActive: userCreated.isActive,
          email: userCreated.email
        },
        message: "user created and logged in sucessfully"
      });
    }
  }
}

module.exports = GoogleAuthController;
