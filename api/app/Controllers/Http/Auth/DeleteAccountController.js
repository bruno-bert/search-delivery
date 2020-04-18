"use strict";

const User = use("App/Models/User");

class DeleteAccountController {
  async deleteAccount({ auth, response }) {
    const user = auth.user;
    console.log(user);

    try {
      auth.logout();
      const existingUser = await User.findBy("email", user.email);
      await existingUser.delete();
    } catch (e) {
      return response
        .status(400)
        .json({ message: "error on trying to remove user: " + e.message });
    }

    /** returns the logged out user info and a message */
    return response.status(200).json({
      user: { email: user.email, name: user.name },
      message: "user removed sucessfully"
    });
  }
}

module.exports = DeleteAccountController;
