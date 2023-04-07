import { settingsModel } from "./../../@types/settingsModel";
import { createEffect, createStore } from "effector";
import api from "../../api";
import { $settings } from "./state";

export const fetchSettings = createEffect(async () => {
  const result = await api.get<any>("/api/settings");
  return result;
});

export const fetchStateAbility2 = createEffect(async () => {
  const result = await api.get<settingsModel>("/api/state");
  return result;
});

export const $state = createStore({}).on(
  fetchStateAbility2.doneData,
  (_, user) => user
);

export const postFetchSettings = createEffect(async (json: any) => {
  const result = await api.addSettings(json);
  return result;
});

$settings.on(fetchSettings.doneData, (_, settings) => settings);
