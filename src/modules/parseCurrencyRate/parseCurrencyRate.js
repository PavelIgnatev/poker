const axios = require("axios");
const { username_api_key, password_api_key } = require("../../constants");

const getCurrencyRate = (from, to) => {
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
    .catch((rej) => rej);
};
module.exports = { getCurrencyRate };
