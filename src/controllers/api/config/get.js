const { getConfig, saveConfig } = require("../../../utils/config");

module.exports = async (req, res) => {
  const { alias } = req.query;

  const config = await getConfig();

  if (!config[alias]) {
    return res.status(404).send({ message: "No such alias" });
  }

  if (!config[alias].alias) {
    config[alias].alias = alias;
    saveConfig(config);
  }

  res.status(200).send(config[alias]);
};
