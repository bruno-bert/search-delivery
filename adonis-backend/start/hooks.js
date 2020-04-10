"use strict";

const { hooks } = require("@adonisjs/ignitor");

hooks.after.providersBooted(() => {
  // handle `InvalidSessionException`
  const Exception = use("Exception");
  Exception.handle("InvalidSessionException", (error, { response }) => {
    return response
      .status(401)
      .json({ message: "unauthorized: " + error.message });
  });

  Exception.handle("InvalidJwtToken", (error, { response }) => {
    return response
      .status(401)
      .json({ message: "unauthorized: " + error.message });
  });

  Exception.handle("ExpiredJwtToken", (error, { response }) => {
    return response
      .status(401)
      .json({ message: "unauthorized: " + error.message });
  });
});
