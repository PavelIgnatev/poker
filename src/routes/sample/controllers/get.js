const { getEmail } = require("../../../utils/email");

module.exports = async (req, res) => {
  const email = await getEmail();

  res.status(200).send(email);
};
