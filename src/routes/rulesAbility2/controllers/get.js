const { readFile } = require("../../../utils/promisify");

module.exports = async (req, res) => {
  let rulesAbility2 = {};

  try {
    rulesAbility2 = JSON.parse(await readFile("src/store/rules/rulesAbility2.json"));
  } catch (e) {
    console.log(e);
  }

  res.status(200).send(rulesAbility2);
};
