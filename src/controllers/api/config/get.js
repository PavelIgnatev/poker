const { getConfig } = require('../../../utils/config');

module.exports = async (req, res) => {
  const { alias } = req.query;

  const config = await getConfig();

  if (!config[alias]) {
    return res.status(404).send({ message: 'No such alias' });
  }

  res.status(200).send(config[alias]);
};
