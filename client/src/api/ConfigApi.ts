import { defaultConfigModel } from "../@types/configModel";
import axios from "axios";
import { ConfigModel } from "../@types/configModel";

class ConfigApi {
  async postConfig(config: defaultConfigModel, password: string) {
    return await axios.post(`/api/config`, { config, password });
  }
  async patchConfig(alias: string, config: ConfigModel, password: string) {
    return await axios.patch(`/api/config`, { config, alias, password });
  }
  async deleteConfig(alias: string, password: string) {
    return await axios.delete(`/api/config`, { data: { alias, password } });
  }
}
export default ConfigApi;
