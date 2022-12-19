const { readFile } = require("../../../utils/promisify");

module.exports = async (req, res) => {
  let ability2 = {};

  try {
    ability2 = JSON.parse(await readFile("src/store/ability2/ability2WithoutName.json"));
  } catch (e) {
    console.log(e);
  }

  res.status(200).send(ability2);
};
