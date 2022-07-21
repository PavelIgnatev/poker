const { getConfig, saveConfig } = require("../../../utils/config");

const { networks } = require("../../../constants");

module.exports = async (req, res) => {
  const { alias, level, effmu, mail } = req.body;

  if (!mail || !level || !effmu) {
    return res.status(400).send("All parameters are required (mail, level, effmu)");
  }

  const config = await getConfig();

  if (config[alias]) {
    return res.status(400).send("Alias is already in use");
  }

  config[alias] = { alias, effmu, mail, networks: {} };

  networks.forEach((network) => {
    config[alias].networks[network] = level;
  });

  await saveConfig(config);

  res.status(201).send();
};
