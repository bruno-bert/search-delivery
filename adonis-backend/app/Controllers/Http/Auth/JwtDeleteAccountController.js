"use strict";

const Redis = use("Redis");
const User = use("App/Models/User");

class JwtDeleteAccountController {
  async deleteAccount({ auth, response }) {
    const user = auth.user;
    const token = auth.getAuthHeader();

    try {
      const existingUser = await User.find(user.id);
      await existingUser.delete();
      Redis.lpush("blacklist", token);
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

module.exports = JwtDeleteAccountController;
