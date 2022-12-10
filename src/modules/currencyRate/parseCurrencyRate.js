const axios = require("axios");

const { username_api_key, password_api_key } = require("../../constants");
const { writeFile, readFile } = require("../../utils/promisify");

const firstAPI = "https://xecdapi.xe.com/v1/convert_to.json/";
const secondAPI =
  "https://api.freecurrencyapi.com/v1/latest?apikey=6au40LH9QCZI8hzEtTIMbHp3pTFl1Jiuj5XFHrbH";

const parseFirstAPI = async (to, from) => {
  return axios
    .get(firstAPI, {
      params: {
        to: to,
        from: from,
        amount: "1.0",
      },
      auth: {
        username: username_api_key,
        password: password_api_key,
      },
    })
    .then((res) => res.data.from[0].mid);
};

const parseSecondAPI = async (currency) => {
  return axios
    .get(secondAPI)
    .then((res) => res.data.data[currency])
    .then((res) => (res ? res : Promise.reject()));
};

async function parseCurrencyRate() {
  console.log("Обновляем текущее состояние курса CNY/USD");

  return parseFirstAPI("USD", "CNY")
    .catch(() => parseSecondAPI("CNY"))
    .catch(async () => JSON.parse(await readFile("src/store/currency/currency.json")).currency)
    .catch(() => console.error("JSON сломан"))
    .then((res) => writeFile("src/store/currency/currency.json", JSON.stringify({ currency: res })))
    .catch(console.error);
}

module.exports = { parseCurrencyRate };
