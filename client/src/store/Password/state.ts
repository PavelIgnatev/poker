import { createStore } from "effector";

export const $isValidAliasPassword = createStore<boolean>(false);

export const $isValidAdminPassword = createStore<boolean>(false);
