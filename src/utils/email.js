const { readFile, writeFile } = require("./promisify");
const { emailPath } = require("../constants");

module.exports = {
  getEmail: async () => JSON.parse(await readFile(emailPath)),
  saveEmail: async (email) => writeFile(emailPath, JSON.stringify(email)),
};
