import { createStore } from "effector";
import { ConfigModel } from "./../../@types/configModel";

export const $config = createStore<ConfigModel | null>(null);

export const DEFAULT_EDITABLE_CONFIG: ConfigModel = {
  alias: "",
  // @ts-ignore шатал я рот этого тайпскрипта, todo ему нужен конфиг, пропускающий []
  networks: [],
  mail: "",
  effmu: "A",
};
export const $editableConfig = createStore<ConfigModel>(DEFAULT_EDITABLE_CONFIG);
