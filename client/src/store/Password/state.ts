import { createStore } from "effector";

export const $password = createStore<string>("");

export const $isValidAdminPassword = createStore<boolean>(false);
