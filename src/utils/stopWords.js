const { stopWordsPath } = require("../constants");
const { readFile, writeFile } = require("./promisify");


module.exports = {
  getStopWords: async () => await readFile(stopWordsPath),
  saveStopWords: async (stopWords) => writeFile(stopWordsPath, JSON.stringify(stopWords)),
};