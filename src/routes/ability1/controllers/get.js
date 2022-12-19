const { readFile } = require("../../../utils/promisify");

module.exports = async (req, res) => {
  let ability1 = {};

  try {
    ability1 = JSON.parse(await readFile("src/store/ability1/ability1.json"));
  } catch (e) {
    console.log(e);
  }

  res.status(200).send(ability1);
};
