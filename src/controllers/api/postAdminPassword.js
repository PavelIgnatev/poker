const { adminPassword } = require("../../constants");

module.exports = async (req, res) => {
  res.send(req.body.password === adminPassword);
};
