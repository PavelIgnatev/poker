const fs = require("fs");
const { compress } = require("compress-json");

const { getFilesDir } = require("../../../helpers/getFilesDir");

module.exports = async (_, res) => {
  try {
    const arrayFileNames = getFilesDir("src/store");
    const objectFileValues = {};

    for (let i = 0; i < arrayFileNames.length; i++) {
      const data = fs.readFileSync(arrayFileNames[i], { encoding: "utf8", flag: "r" });
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      objectFileValues[arrayFileNames[i]] = parsedData;
    }

    res.send(JSON.stringify(compress(objectFileValues)));
  } catch (error) {
    console.log(error);
  }
};
