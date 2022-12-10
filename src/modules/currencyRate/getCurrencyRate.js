const { readFile } = require("../../utils/promisify");

const getCurrencyRate = async () => {
  let { currency } = JSON.parse(await readFile("src/store/currency/currency.json"));

  return currency ?? 0;
};

module.exports = { getCurrencyRate };
