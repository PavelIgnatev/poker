const { getConfig, saveConfig } = require("../../../utils/config");
const { adminPassword } = require("../../../constants");

module.exports = async (req, res) => {
  const { alias, password } = req.body;

  const config = await getConfig();

  if (password !== adminPassword) {
    return res.status(403).send("Wrong password");
  }

  if (!config[alias]) {
    return res.status(404).send("No such alias");
  }

  delete config[alias];

  await saveConfig(config);

  res.status(204).send();
};
