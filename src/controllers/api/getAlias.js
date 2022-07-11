const { readFile } = require("../../utils/promisify");

module.exports = async (req, res) => {
  const aliases = JSON.parse(await readFile("src/store/alias/alias.json"));
  const newAliases = {};

  Object.keys(aliases).forEach((name) => {
    const { level } = aliases[name];
    if (!newAliases[level]) newAliases[level] = [];

    newAliases[level] = newAliases[level].concat(name);
  });
  
  res.json(newAliases);
};
