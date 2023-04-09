import { createDomain } from "effector";

import api from "../../api";

import { $store, StoreModel } from "./state";

const storeDomain = createDomain();

export const getStoreRequest = storeDomain.createEffect(async () => {
  const offpeak = await api.get<StoreModel["offpeak"]>("/api/store/offpeak");
  const currency = await api.get<StoreModel["currency"]>("/api/store/currency");
  const rules = await api.get<StoreModel["rules"]>("/api/store/rulesAbility2");

  return { offpeak, currency, rules };
});

$store.on(getStoreRequest.doneData, (_, store) => store);
