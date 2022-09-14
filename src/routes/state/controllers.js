const { readFile } = require("fs");
const path = require("path");

const getAbility2 = async (req, res) => {
  res.send(JSON.parse(await readFile("src/store/ability2/ability2.json")));
};

module.exports = { getAbility2 };
