import { defaultConfigModel } from "../@types/configModel";
import axios from "axios";
import { ConfigModel } from "../@types/configModel";

class ConfigApi {
  async postConfig(params: defaultConfigModel) {
    return await axios.post(`/api/config`, params);
  }
  async patchConfig(alias: string, config: ConfigModel) {
    return await axios.patch(`/api/config`, { config, alias });
  }
  async deleteConfig(alias: string) {
    return await axios.delete(`/api/config`, { data: { alias } });
  }
}
export default ConfigApi;
