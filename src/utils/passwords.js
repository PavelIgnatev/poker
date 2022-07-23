const { adminPassword } = require("../constants");

module.exports = {
  checkPassword: (passwordFromReq, passwordFromConfig) =>
    String(passwordFromReq) !== String(passwordFromConfig) &&
    String(passwordFromReq) !== adminPassword,
};
