import axios from "axios";
import ConfigApi from "./ConfigApi";
class Api extends ConfigApi {
  async get<T>(url: string, params?: any) {
    let fullUrl: string = url;
    if (params) {
      fullUrl += "?" + new URLSearchParams(params).toString();
    }
    return (await axios(fullUrl))?.data as T;
  }
  async addSettings(settings: any) {
    return await axios.post(`/api/settings`, settings);
  }
  async addAlias(settings: any) {
    return await axios.post(`/api/aliases`, settings);
  }
  async checkAdminPassword(password: string) {
    return await axios.post(`/api/password/admin`, { password });
  }
}
export default new Api();
