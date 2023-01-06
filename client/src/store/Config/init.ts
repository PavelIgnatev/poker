import { createDomain, createApi } from "effector";

import { ConfigModel, defaultConfigModel } from "../../@types/configModel";
import api from "../../api";
import { ErrNot } from "../../components/NotificationService";

import { $config, $editableConfig, DEFAULT_EDITABLE_CONFIG } from "./state";
import { Effmu, Level, Network } from "../../@types/common";

const DEFAULT_ERROR_MESSAGE =
  "An error has occurred. You are denied access to the service.";

const configDomain = createDomain();

export const { clearConfig } = createApi($config, {
  clearConfig: () => null,
});

export const getConfigRequest = configDomain.createEffect(
  async (params: { alias: string; password: string }) => {
    return await api.get<ConfigModel>("/api/config", params);
  }
);

export const postConfigRequest = configDomain.createEffect(
  async (params: { config: defaultConfigModel; password: string }) => {
    const { config, password } = params;

    await api.postConfigRequest(config, password);
  }
);

export const patchConfigRequest = configDomain.createEffect(
  async ({
    alias,
    config,
    password,
  }: {
    alias: string;
    config: ConfigModel;
    password: string;
  }) => {
    await api.patchConfigRequest(alias, config, password);
    await getConfigRequest({ alias, password: config.password });
  }
);

export const deleteConfigRequest = configDomain.createEffect(
  async (params: { alias: string; password: string }) => {
    await api.deleteConfig(params);
    clearConfig();
  }
);

configDomain.onCreateEffect((effect) => {
  effect.fail.watch(({ error }: { error: any }) =>
    ErrNot(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE)
  );
});

export const editableConfigEvents = createApi($editableConfig, {
  setConfig: (_, config: ConfigModel) => config,
  setConfig2: (_, config: ConfigModel) => config,
  clearConfig: (_) => DEFAULT_EDITABLE_CONFIG,
  handleChangeMail: (config, mail: string) => ({
    ...config,
    mail,
  }),
  handleChangeEffmu: (
    config,
    { network, effmu }: { network: Network; effmu: Effmu }
  ) => ({
    ...config,
    networks: {
      ...config.networks,
      [network]: { ...config.networks[network], effmu },
    },
  }),
  handleChangeLevel: (
    config,
    { network, level }: { network: Network; level: Level }
  ) => ({
    ...config,
    networks: {
      ...config.networks,
      [network]: { ...config.networks[network], level },
    },
  }),
  handleChangePassword: (config, password: string) => ({
    ...config,
    password,
  }),
  handleTimezoneChange: (config, timezone) => ({ ...config, timezone }),
  handleChangeEffmuAll: (config, effmu) => ({
    ...config,
    networks: Object.keys(config.networks).reduce(
      (acc, network) => ({
        ...acc,
        [network]: { ...config.networks[network], effmu },
      }),
      {}
    ),
  }),
});

$config.on(getConfigRequest.doneData, (_, config) => config);
