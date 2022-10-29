const axios = require("axios");
const { username_api_key, password_api_key } = require("../../constants");
const fs = require("fs");

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
  const url = "https://cdn.cur.su/api/latest.json";
  return axios
    .get(url)
    .then((res) => res.data.rates[currency])
    .then((res) => (res ? res : Promise.reject()));
};

async function parseCurrencyRate() {
  return parseFirstAPI("USDD", "CNY")
    .catch(() => {
      console.log("Первое API сломано");
      return parseSecondAPI("CNYYY");
    })
    .catch(async () => {
      console.log("Второе API сломано");
      return (await readFile()).data;
    })
    .then((res) => {
      fs.writeFile(
        __dirname + "/../../store/currency/currency.json",
        JSON.stringify({ data: res }),
        (error) => (error ? console.log("Ошибка записи в файл", error) : null),
      );
      return res;
    });
}

const readFile = async () => {
  const fileContent = await new Promise((resolve, reject) => {
    return fs.readFile(__dirname + "/../../store/currency/currency.json", "utf8", (err, obj) => {
      if (err) {
        return reject(err);
      }
      return resolve(JSON.parse(obj));
    });
  });
  return fileContent;
};

(async () => {
  console.log(await parseCurrencyRate());
})();

module.exports = { parseCurrencyRate };
