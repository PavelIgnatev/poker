const axios = require("axios");
const { username_api_key, password_api_key } = require("../../constants");
const fs = require("fs");
const { writeFile, readFile } = require("../../utils/promisify");

const parseFirstAPI = async (to, from) => {
  const url = "https://xecdapi.xe.com/v1/convert_to.json/";
  return axios
    .get(url, {
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
  const url = "https://api.freecurrencyapi.com/v1/latest?apikey=6au40LH9QCZI8hzEtTIMbHp3pTFl1Jiuj5XFHrbH";
  return axios
    .get(url)
    .then((res) => res.data.data[currency])
    .then((res) => (res ? res : Promise.reject()));
};

// async function parseCurrencyRate() {
  setInterval(async ()=> {
    return parseFirstAPI("USD", "CNY")
    .catch(() => {
      console.log("Первое API сломано");
      return parseSecondAPI("CNY");
    })
    .catch(async () => {
      console.log("Второе API сломано");
      return JSON.parse(await readFile("src/store/currency/currency.json")).currency;
    })
    .catch(() => console.log("JSON сломан"))
    .then((res) => {
      writeFile("src/store/currency/currency.json", JSON.stringify({ currency: res }));
      console.log(res);
      return res;
    });
  }, 14400000);

// }

// (async () => await parseCurrencyRate())();

// module.exports = { parseCurrencyRate };
