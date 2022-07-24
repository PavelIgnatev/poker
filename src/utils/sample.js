const { readFile, writeFile } = require("../utils/promisify");
const { samplePath } = require("../constants");

module.exports = {
  getSample: async () => JSON.parse(await readFile(samplePath)),
  saveSample: async (sample) => writeFile(samplePath, JSON.stringify(sample)),
};
