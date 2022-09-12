const { adminPassword } = require("../../constants");

const postAdminPassword = async (req, res) => {
  res.send(req.body.password === adminPassword);
};

module.exports = { postAdminPassword };
