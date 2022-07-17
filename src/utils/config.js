const { readFile, writeFile } = require('../utils/promisify');
const { configPath } = require('../constants');

module.exports = {
  getConfig: async () => JSON.parse(await readFile(configPath)),
  saveConfig: async (config) => writeFile(configPath, JSON.stringify(config)),
};
