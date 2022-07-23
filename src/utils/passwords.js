const { readFile, writeFile } = require("../utils/promisify");
const { passwordsPath } = require("../constants");

module.exports = {
  getPasswords: async () => JSON.parse(await readFile(passwordsPath)),
  savePasswords: async (config) => writeFile(passwordsPath, JSON.stringify(config)),
};
