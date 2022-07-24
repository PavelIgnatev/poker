const { getConfig, saveConfig } = require("../../../utils/config");

const { networks, adminPassword } = require("../../../constants");

module.exports = async (req, res) => {
  const { config: newConfig, password: reqAdminPassword } = req.body;

  if (reqAdminPassword !== adminPassword) {
    return res.status(403).send("Wrong password");
  }

  if (!newConfig) {
    return res.status(400).send('"Config" parameter is required');
  }

  const { alias, level, effmu, mail, password } = newConfig;
  if (!mail || !level || !effmu || !alias || !password) {
    return res
      .status(400)
      .send("All parameters are required (mail, level, effmu, alias, password)");
  }

  const config = await getConfig();

  if (config[alias]) {
    return res.status(400).send("Alias is already in use");
  }

  config[alias] = { alias, effmu, mail, networks: {}, password };

  networks.forEach((network) => {
    config[alias].networks[network] = level;
  });

  await saveConfig(config);

  res.status(201).send();
};
