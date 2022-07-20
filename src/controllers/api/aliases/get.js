const { getConfig } = require("../../../utils/config");

module.exports = async (req, res) => {
  const config = await getConfig();

  res.status(200).send(Object.keys(config));
};
