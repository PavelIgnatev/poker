import { createApi, createEffect } from 'effector';
import api from '../../api';
import { $isValidPassword, $password } from './state';

export const { handleChangePassword } = createApi($password, {
  handleChangePassword: (_: string, v: string) => v,
});

export const { handleChangeValidPassword } = createApi($isValidPassword, {
  handleChangeValidPassword: (_: boolean, v: boolean) => v,
});

export const postFetchPassword = createEffect(async (password: string) => {
  const result = await api.checkPassword(password);
  handleChangeValidPassword(result.data as boolean);
});
