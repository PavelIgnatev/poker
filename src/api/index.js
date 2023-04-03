const axios = require("axios");
class Api {
  async get(url, params) {
    let fullUrl = url;
    if (params) {
      fullUrl += "?" + new URLSearchParams(params).toString();
    }
    return (
      await axios(fullUrl, {
        headers: {
          accept: "application/json",
          password: "19a8c678f48a56dbfe276c7be5dabd98",
          username: "info@pocarr.com",
        },
      })
    )?.data?.Response;
  }
}
const api = new Api();
module.exports = { api };
