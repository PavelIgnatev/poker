import { createDomain, createApi } from "effector";

import { ConfigModel, defaultConfigModel } from "../../@types/configModel";
import api from "../../api";
import { ErrNot } from "../../components/NotificationService";

import { $config, $editableConfig, DEFAULT_EDITABLE_CONFIG } from "./state";
import { Effmu, Level, Network } from "../../@types/common";

const DEFAULT_ERROR_MESSAGE = "An error has occurred. You are denied access to the service.";

const configDomain = createDomain();

export const getConfig = configDomain.createEffect(
  async (params: { alias: string; password: string }) => {
    return await api.get<ConfigModel>("/api/config", params);
  },
);

export const postConfig = configDomain.createEffect(
  async (params: { config: defaultConfigModel; password: string }) => {
    const { config, password } = params;

    await api.postConfig(config, password);
  },
);

export const patchConfig = configDomain.createEffect(
  async ({ alias, config, password }: { alias: string; config: ConfigModel; password: string }) => {
    await api.patchConfig(alias, config, password);
    await getConfig({ alias, password: config.password });
  },
);

export const deleteConfig = configDomain.createEffect(
  async (params: { alias: string; password: string }) => {
    const { alias, password } = params;
    await api.deleteConfig(alias, password);
    await getConfig({ alias, password });
  },
);

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
  handleChangePassword: (config, password: string) => ({
    ...config,
    password,
  }),
});

$config.on(getConfig.doneData, (_, config) => config);
