import { ConfigModel, defaultConfigModel } from "./../../@types/configModel";
import api from "../../api";
import { $config, $isError } from "./state";

import { createDomain, attach, is } from "effector";

const logFailuresDomain = createDomain();

// logFailuresDomain.onCreateEffect((effect) => {
//   if (is.attached(effect)) {
//     console.log("DSA");
//     effect.fail.watch(({ params, error }) => {
//       console.warn(
//         `Effect "${effect.compositeName.fullName}" failed`,
//         params,
//         error
//       );
//     });
//   }
// });

export const getConfig = logFailuresDomain.createEffect(
  async (alias: string) => {
    const result = await api.get<ConfigModel>("/api/config", { alias });

    return result;
  }
);

export const postConfig = logFailuresDomain.createEffect(
  async (config: defaultConfigModel) => {
    await api.postConfig(config);
    await getConfig(config.alias);

    return null;
  }
);

export const patchConfig = logFailuresDomain.createEffect(
  async ({ alias, config }: { alias: string; config: ConfigModel }) => {
    await api.patchConfig(alias, config);
    await getConfig(alias);

    return null;
  }
);

export const deleteConfig = logFailuresDomain.createEffect(
  async (alias: string) => {
    await api.deleteConfig(alias);

    return null;
  }
);

getConfig("sadsad");

$config.on(getConfig.doneData, (_, config) => config);
