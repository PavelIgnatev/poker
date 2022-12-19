const { readFile } = require("../../../utils/promisify");

module.exports = async (req, res) => {
  let defaultCurrency = 0;

  try {
    const { currency } = JSON.parse(await readFile("src/store/currency/currency.json"));
    defaultCurrency = currency;
  } catch (e) {
    console.log(e);
  }

  res.status(200).send(defaultCurrency);
};
