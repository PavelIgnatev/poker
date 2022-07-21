import { createApi, createEffect } from "effector";
import api from "../../api";
import { $isValidAdminPassword, $password } from "./state";

export const { handleChangePassword } = createApi($password, {
  handleChangePassword: (_: string, v: string) => v,
});

export const { validateAdminPassword } = createApi($isValidAdminPassword, {
  validateAdminPassword: (_: boolean, v: boolean) => v,
});

export const validateAdminPasswordRequest = createEffect(async (password: string) => {
  const result = await api.checkPassword(password);
  validateAdminPassword(result.data as boolean);
});
