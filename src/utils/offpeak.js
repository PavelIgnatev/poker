const { readFile, writeFile } = require("./promisify");
const { offpeakPath } = require("../constants");

module.exports = {
  saveOffpeak: async (offpeak) => writeFile(offpeakPath, JSON.stringify(offpeak)),
};
