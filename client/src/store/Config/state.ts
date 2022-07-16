import { createStore } from "effector";
import { ConfigModel } from "./../../@types/configModel";

export const $config = createStore<ConfigModel | null>(null);
export const $isError = createStore<boolean>(false);
