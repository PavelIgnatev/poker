const { getConfig } = require("../../utils/config");

const get = async (req) => {
  const { level } = req.query;
  const numLevel = Number(level);

  const config = await getConfig();

  let aliases = Object.keys(config);

  if (!isNaN(numLevel)) {
    aliases = aliases.filter((alias) => {
      console.log(Object.values(config[alias].networks))
      const levels = Object.values(config[alias].networks).map((network)=> network.level);

      return levels.includes(numLevel);
    });
  }

  return aliases;
};

module.exports = { get };
