const { readFile } = require("../../../utils/promisify");

module.exports = async (req, res) => {
  let offpeak = {};

  try {
    offpeak = JSON.parse(await readFile("src/store/offpeak/offpeak.json"));
  } catch (e) {
    console.log(e);
  }

  res.status(200).send(offpeak);
};
