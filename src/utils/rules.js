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

  getPreviewAbility2: async () => JSON.parse(await readFile(previewRulesAbility2Path)),
  savePreviewAbility2: async (preview) =>
    writeFile(previewRulesAbility2Path, JSON.stringify(preview)),
  getRulesAbility2: async () => JSON.parse(await readFile(rulesAbility2Path)),
  saveRulesAbility2: async (rules) => writeFile(rulesAbility2Path, JSON.stringify(rules)),
};
