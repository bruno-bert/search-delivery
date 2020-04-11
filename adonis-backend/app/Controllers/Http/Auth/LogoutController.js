"use strict";

class LogoutController {
  async logout({ auth, response }) {
    const user = auth.user;

    try {
      await auth.logout();
    } catch (e) {
      return response
        .status(400)
        .json({ message: "error on trying to logout: " + e.message });
    }

    /** returns the logged out user info and a message */
    return response.status(200).json({
      user: { email: user.email, name: user.name, isActive: user.isActive },
      message: "user logged out sucessfully"
    });
  }
}

module.exports = LogoutController;