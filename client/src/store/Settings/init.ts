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

export const fetchStateAlias = createEffect(async () => {
  const result = await api.get<settingsModel>("/api/alias");
  return result;
});

export const $prevSettings = createStore([]).on(fetchSettings.doneData, (_, user) => user);

export const $state = createStore({}).on(fetchStateAbility2.doneData, (_, user) => user);

export const $stateAliases = createStore({}).on(fetchStateAlias.doneData, (_, user) => user);

export const postFetchSettings = createEffect(async (json: any) => {
  console.log(json);
  const result = await api.addSettings(json);
  return result;
});

export const postFetchAlias = createEffect(async (json: any) => {
  console.log(json);
  const result = await api.addAlias(json);
  return result;
});

$settings.on(fetchSettings.doneData, (_, settings) => settings);
