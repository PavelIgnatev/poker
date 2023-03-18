const { getConfig } = require("../../../utils/config");
const { checkPassword } = require("../../../utils/passwords");

module.exports = async (req, res) => {
  const { alias, password } = req.query;

  const config = await getConfig();

  const wrongAlias = !config[alias];
  const wrongPassword = checkPassword(password, config[alias]?.password);

  if (wrongAlias || wrongPassword) {
    return res.status(403).send({ message: "Alias or password entered incorrectly" });
  }

  res.status(200).send(config[alias]);
};
