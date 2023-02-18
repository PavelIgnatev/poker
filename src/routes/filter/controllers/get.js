const { readFile } = require("../../../utils/promisify");
const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  try {
    const content = await readFile("src/modules/filter/frontFilter.js");

    return res.send(content);
  } catch (e) {
    console.log(e);
    res.status(404).send(null);
  }
  res.status(404).send(null);
};
