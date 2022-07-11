const { readFile } = require("../../utils/promisify");

module.exports = async (req, res) => {
  res.json(JSON.parse(await readFile("src/store/ability2/ability2.json")));
};
