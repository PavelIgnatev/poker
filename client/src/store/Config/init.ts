import { createDomain, createApi } from "effector";
import { $config } from "./state";
import { ConfigModel, defaultConfigModel } from "./../../@types/configModel";
import api from "../../api";
import { ErrNot } from "../../components/NotificationService";

const failuresDomain = createDomain();

export const getConfig = failuresDomain.createEffect(async (alias: string) => {
  const result = await api.get<ConfigModel>("/api/config", { alias });

  return result;
});

export const postConfig = failuresDomain.createEffect(
  async (config: defaultConfigModel) => {
    await api.postConfig(config);
    await getConfig(config.alias);
  }
);

export const patchConfig = failuresDomain.createEffect(
  async ({ alias, config }: { alias: string; config: ConfigModel }) => {
    await api.patchConfig(alias, config);
    await getConfig(alias);
  }
);

export const deleteConfig = failuresDomain.createEffect(
  async (alias: string) => {
    await api.deleteConfig(alias);
    await getConfig(alias);
  }
);

const DEFAULT_ERROR_MESSAGE = "An error has occurred. You are denied access to the service.";

failuresDomain.onCreateEffect((effect) => {
  effect.fail.watch(({ error }: { error: any }) =>
    ErrNot(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE)
  );
});

$config.on(getConfig.doneData, (_, config) => config);
