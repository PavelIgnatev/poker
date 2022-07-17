const { getConfig, saveConfig } = require('../../../utils/config');

module.exports = async (req, res) => {
  const { alias } = req.body;

  const config = await getConfig();

  if (!config[alias]) {
    return res.status(404).send('No such alias');
  }

  delete config[alias];

  await saveConfig(config);

  res.status(204).send();
};
