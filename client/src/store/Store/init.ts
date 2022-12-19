import { log } from "console";
import { createDomain, createApi } from "effector";

import api from "../../api";

import { $store, StoreModel } from "./state";

const storeDomain = createDomain();

export const getStoreRequest = storeDomain.createEffect(async () => {
  const ability1 = await api.get<StoreModel["ability1"]>("/api/store/ability1");
  const ability2 = await api.get<StoreModel["ability2"]>("/api/store/ability2");
  const offpeak = await api.get<StoreModel["offpeak"]>("/api/store/offpeak");
  const currency = await api.get<StoreModel["currency"]>("/api/store/currency");
  const rules = await api.get<StoreModel["rules"]>("/api/store/rulesAbility2");

  return { ability1, ability2, offpeak, currency, rules };
});

$store.on(getStoreRequest.doneData, (_, store) => store);

getStoreRequest();
