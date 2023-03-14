const { readFile, writeFile } = require("./promisify");
const { rulesAbility2Path, previewRulesAbility2Path, rulesPath } = require("../constants");
const { filterRules } = require("../helpers/filterRules");

module.exports = {
  getRules: async () => JSON.parse(await readFile(rulesPath)),
  saveRules: async (rules) => writeFile(rulesPath, JSON.stringify(rules).replace("]]]", "]]")),
  getFiltredRules: async (color, level, network, status, KO) => {
    const rules = JSON.parse(await readFile(rulesPath));

    return rules.filter((rule) => filterRules(rule[0], color, level, network, status, KO));
  },
};
