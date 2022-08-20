import { rulesModel } from "../../@types/rulesModel";
import { createDomain } from "effector";

import api from "../../api";
import { ErrNot } from "../../components/NotificationService";

import { $rules } from "./state";

const DEFAULT_ERROR_MESSAGE = "An error has occurred. You are denied access to the service.";

const configDomain = createDomain();

export const getRulesRequest = configDomain.createEffect(
  async (params: {
    color: string;
    level: string;
    network: string;
    status: string;
    KO: boolean;
  }) => {
    return await api.get<Array<rulesModel[]>>("/api/rules", params);
  },
);

export const postRulesRequest = configDomain.createEffect(async (rules: rulesModel[]) => {
  await api.postRules(rules);
  await getRulesRequest(rules[0]);
});

export const deleteRulesRequest = configDomain.createEffect(async (rule: rulesModel[]) => {
  await api.deleteRules(rule);
  await getRulesRequest(rule[0]);
});

configDomain.onCreateEffect((effect) => {
  effect.fail.watch(({ error }: { error: any }) =>
    ErrNot(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE),
  );
});

$rules.on(getRulesRequest.doneData, (_, rules) => rules);
