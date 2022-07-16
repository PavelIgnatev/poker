import { createDomain, createApi } from "effector";
import { $config, $isError } from "./state";
import { ConfigModel, defaultConfigModel } from "./../../@types/configModel";
import api from "../../api";

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

const { handleChaingeIsError } = createApi($isError, {
  handleChaingeIsError: (_, v: boolean) => v,
});

failuresDomain.onCreateEffect((effect) => {
  effect.fail.watch(() => handleChaingeIsError(true));
  effect.done.watch(() => handleChaingeIsError(false));
});

$config.on(getConfig.doneData, (_, config) => config);
