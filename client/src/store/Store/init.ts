import { createDomain } from "effector";

import api from "../../api";

import { $store, StoreModel } from "./state";

const storeDomain = createDomain();

export const getStoreRequest = storeDomain.createEffect(async () => {
  const ability1 = await api.get<StoreModel["ability1"]>("/api/store/ability1");
  const lastValue = await api.get<StoreModel["lastValue"]>("/api/store/currency");

  return { ability1, lastValue };
});

$store.on(getStoreRequest.doneData, (_, store) => store);
