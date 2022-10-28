const axios = require("axios");
const { username_api_key, password_api_key } = require("../../constants");

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
    .then((res) => res.data.from[0].mid)
    .catch((rej) => rej.response);
};

const parseSecondAPI = async (currency) => {
  const url = "https://cdn.cur.su/api/latest.json";
  return axios
    .get(url)
    .then((res) => res.data.rates[currency])
    .catch((rej) => rej.response);
};

async function parseCurrencyRate() {
  const firstReq = await parseFirstAPI("USD", "CNY");
  const secondReq = await parseSecondAPI("CNY");

  if (firstReq) {
    return firstReq;
  } else if (secondReq) {
    return secondReq;
  } else {
    return "ERROR";
  }
}

module.exports = { parseCurrencyRate };
