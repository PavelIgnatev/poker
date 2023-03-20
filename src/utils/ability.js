const { readFile, writeFile } = require("../utils/promisify");
const { abilityPath } = require("../constants");

module.exports = {
  getAbility: async () => JSON.parse(await readFile(abilityPath)),
  saveAbility: async (ability) => writeFile(abilityPath, JSON.stringify(ability)),
};
