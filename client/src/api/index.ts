import { rulesModel } from "./../@types/rulesModel";
import { offpeakModel } from "../@types/offpeakModel";
import axios from "axios";
import ConfigApi from "./ConfigApi";
import { stopWordsModel } from "../@types/stopWords";
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
  async postSample(sample: string) {
    return await axios.post(`/api/sample`, { sample });
  }
  async postStopWords(stopWords: stopWordsModel) {
    return await axios.post(`/api/stopwords`, { stopWords });
  }
  async postOffpeak(offpeak: offpeakModel) {
    return await axios.post(`/api/offpeak`, { offpeak });
  }
  async postRules(rules: rulesModel[]) {
    return await axios.post(`/api/rules`, { rules });
  }
  async patchRules(rules: rulesModel[], offpeak: boolean) {
    return await axios.patch(`/api/rules`, { rules, offpeak });
  }
  async deleteRules(data: rulesModel[]) {
    return await axios.delete(`/api/rules`, { data });
  }
  async postUpdate() {
    return await axios.post(`/api/update`);
  }
}

const api = new Api();

export default api;
