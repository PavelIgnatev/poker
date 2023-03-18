const { getConfig, saveConfig } = require("../../../utils/config");
const { checkPassword } = require("../../../utils/passwords");

module.exports = async (req, res) => {
  const { alias, config: newConfig, password } = req.body;

  console.log(newConfig);
  
  if (!newConfig) {
    return res.status(403).send({ message: "Config is required parameter" });
  }

  if (alias !== newConfig.alias) {
    return res.status(403).send({ message: "You can't change alias field" });
  }

  const config = await getConfig();

  const wrongAlias = !config[alias];
  const wrongPassword = checkPassword(password, config[alias]?.password);
  if (wrongAlias || wrongPassword) {
    return res.status(403).send({ message: "Alias or password entered incorrectly" });
  }

  config[alias] = newConfig;

  await saveConfig(config);

  res.status(200).send();
};
