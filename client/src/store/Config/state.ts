import { createStore } from "effector";

import { TIMEZONES } from "../Select";
import { ConfigModel } from "./../../@types/configModel";

export const $config = createStore<ConfigModel | null>(null);

export const DEFAULT_EDITABLE_CONFIG: ConfigModel = {
  alias: "",
  networks: {},
  password: "",
  timezone: TIMEZONES[0].value,
};
export const $editableConfig = createStore<ConfigModel>(
  DEFAULT_EDITABLE_CONFIG
);
