import { emailModel } from "../../@types/emailModel";
import { createEffect, createApi } from "effector";
import api from "../../api";
import { $email } from "./state";

export const getEmail = createEffect(async () => {
  const result = await api.get<emailModel>("/api/email");

  return result.email;
});

export const postEmail = createEffect(async ({ email }: { email: string }) => {
  await api.postEmail(email);
});

export const { handleChangeEmail } = createApi($email, {
  handleChangeEmail: (_, email: string) => email,
});

$email.on(getEmail.doneData, (_, email) => email);
