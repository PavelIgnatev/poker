const fs = require("fs");
const { decompress } = require("compress-json");

const { getFilesDir } = require("../../../helpers/getFilesDir");
const { api } = require("../../../api");

module.exports = async (req, res) => {
  try {
    const { store } = req.body;

    const decompressStore = decompress(store);
    const arrayFileNames = Object.keys(decompressStore);

    for (let i = 0; i < arrayFileNames.length; i++) {
      const currentFileName = arrayFileNames[i];

      fs.writeFileSync(currentFileName, JSON.stringify(decompressStore[currentFileName]));
    }

    res.send({});
  } catch (error) {
    console.log(error);
  }
};
