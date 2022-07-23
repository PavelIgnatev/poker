const { getPasswords } = require("../../../utils/passwords");

module.exports = async (req, res) => {
  const { alias, password } = req.body;

  const passwords = getPasswords();

  if (!passwords[alias]) {
    return res.status(404).send({ message: "No such alias" });
  }

  res.send(password === passwords[alias]);
};
