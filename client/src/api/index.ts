import axios from "axios";
class Api {
  async get<T>(url: string, params?: any) {
    let fullUrl: string = url;
    if (params) {
      fullUrl += "?" + new URLSearchParams(params).toString();
    }
    return (await axios(fullUrl))?.data as T;
  }
  async addSettings(settings: unknown) {
    return await axios.post(`/api/settings`, settings);
  }
  async addAlias(settings: unknown) {
    return await axios.post(`/api/aliases`, settings);
  }
  async checkPassword(password: string) {
    return await axios.post(`/api/password`, { password });
  }
}
export default new Api();
