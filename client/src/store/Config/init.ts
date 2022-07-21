import { createDomain, createApi } from "effector";

import { ConfigModel, defaultConfigModel } from "../../@types/configModel";
import api from "../../api";
import { ErrNot } from "../../components/NotificationService";

import { $config, $editableConfig, DEFAULT_EDITABLE_CONFIG } from "./state";
import { Effmu, Level, Network } from "../../@types/common";

const DEFAULT_ERROR_MESSAGE = "An error has occurred. You are denied access to the service.";

const configDomain = createDomain();

export const getConfig = configDomain.createEffect(async (alias: string) => {
  return await api.get<ConfigModel>("/api/config", { alias });
});

export const postConfig = configDomain.createEffect(async (config: defaultConfigModel) => {
  await api.postConfig(config);
  await getConfig(config.alias);
});

export const patchConfig = configDomain.createEffect(
  async ({ alias, config }: { alias: string; config: ConfigModel }) => {
    await api.patchConfig(alias, config);
    await getConfig(alias);
  },
);

export const deleteConfig = configDomain.createEffect(async (alias: string) => {
  await api.deleteConfig(alias);
  await getConfig(alias);
});

configDomain.onCreateEffect((effect) => {
  effect.fail.watch(({ error }: { error: any }) =>
    ErrNot(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE),
  );
});

export const editableConfigEvents = createApi($editableConfig, {
  setConfig: (_, config: ConfigModel) => config,
  clearConfig: (_) => DEFAULT_EDITABLE_CONFIG,
  handleChangeMail: (config, mail: string) => ({
    ...config,
    mail,
  }),
  handleChangeEffmu: (config, effmu: Effmu) => ({
    ...config,
    effmu,
  }),
  handleChangeLevel: (config, { network, level }: { network: Network; level: Level }) => ({
    ...config,
    networks: { ...config.networks, [network]: level },
  }),
});

$config.on(getConfig.doneData, (_, config) => config);
