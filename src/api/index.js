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
          password: "eef80903dea560693a77b87f63dffffa",
          username: "info.komandaa2023@gmail.com",
        },
      })
    )?.data?.Response;
  }
}
const api = new Api();
module.exports = { api };
