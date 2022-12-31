import { createApi, createEffect } from "effector";
import api from "../../api";
import { $isValidAdminPassword, $password } from "./state";

export const { handleChangePassword } = createApi($password, {
  handleChangePassword: (_: string, v: string) => {
    localStorage.setItem("password", v);

    return v;
  },
});

export const { setIsValidAdminPassword } = createApi($isValidAdminPassword, {
  setIsValidAdminPassword: (_: boolean, v: boolean) => v,
});

export const validateAdminPasswordRequest = createEffect(
  async (password: string) => {
    const result = await api.checkAdminPassword(password);
    setIsValidAdminPassword(!!result.data);
  }
);
