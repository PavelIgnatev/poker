const { getConfig, saveConfig } = require("../../../utils/config");

module.exports = async (req, res) => {
  const { alias, config: newConfig } = req.body;

  if (!newConfig) {
    return res.status(400).send("Config is required parameter");
  }

  const config = await getConfig();

  if (!config[alias]) {
    return res.status(404).send("No such alias");
  }

  config[alias] = newConfig;

  await saveConfig(config);

  res.status(200).send();
};
