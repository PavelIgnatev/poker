const { getPasswords } = require("../../../utils/passwords");

module.exports = async (req, res) => {
  const { alias } = req.body;

  const passwords = getPasswords();

  if (!passwords[alias]) {
    return res.status(404).send({ message: "No such alias" });
  }

  res.send(passwords[alias]);
};
