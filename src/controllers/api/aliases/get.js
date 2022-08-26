const { getConfig } = require("../../../utils/config");

module.exports = async (req, res) => {
  const { level } = req.query;
  const numLevel = Number(level);

  const config = await getConfig();

  let aliases = Object.keys(config);

  if (!isNaN(numLevel)) {
    aliases = aliases.filter((alias) => {
      const levels = Object.values(config[alias].networks);

      return levels.includes(numLevel);
    });
  }

  res.status(200).send(aliases);
};
