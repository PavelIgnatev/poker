const util = require("util");
const fs = require("fs");

const Write = util.promisify(fs.writeFile);
const Read = util.promisify(fs.readFile);

const writeFile = async (path, text) => {
  return await Write(path, text);
};
const readFile = async (path) => {
  return await Read(path, "utf-8");
};
module.exports = { writeFile, readFile };
