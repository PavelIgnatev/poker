const { readFile } = require("../../utils/promisify");

const getAbility2 = async (req, res) => {
  res.json(JSON.parse(await readFile("src/store/ability2/ability2.json")));
};

module.exports = { getAbility2 };
