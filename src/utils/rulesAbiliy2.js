const { readFile, writeFile } = require("../utils/promisify");
const { previewRulesPath, rulesPath } = require("../constants");

module.exports = {
  getPreview: async () => JSON.parse(await readFile(previewRulesPath)),
  savePreview: async (preview) => writeFile(previewRulesPath, JSON.stringify(preview)),
  getRules: async () => JSON.parse(await readFile(rulesPath)),
  saveRules: async (rules) => writeFile(rulesPath, JSON.stringify(rules)),
};
