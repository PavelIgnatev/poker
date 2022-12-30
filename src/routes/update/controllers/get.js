const { readFile } = require("../../../utils/promisify");

module.exports = async (req, res) => {
  try {
    const updateUrl = "src/store/update/update.json";

    const result = JSON.parse(await readFile(updateUrl));
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
  res.status(200).send({});
};
