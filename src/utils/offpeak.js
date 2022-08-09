const { readFile, writeFile } = require("./promisify");
const { offpeakPath } = require("../constants");

module.exports = {
  getOffpeak: async () => JSON.parse(await readFile(offpeakPath)),
  saveOffpeak: async (offpeak) => writeFile(offpeakPath, JSON.stringify(offpeak)),
};
