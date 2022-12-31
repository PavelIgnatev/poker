import { useStore } from "effector-react";

import { BaseTable } from "../../components/BaseTable";
import { BaseHeader } from "../../components/BaseHeader";
import { $filtredTableState, fetchUserReposFx } from "../../store/Table";
import { $config, getConfigRequest } from "../../store/Config";
import {
  OnPasswordSubmit,
  PasswordSection,
} from "../../components/PasswordSection";
import { useIntervalWorker } from "../../hooks/useIntervalWorker";
import { BaseFooter } from "../../components/BaseFooter";

export const MainPage = () => {
  const loading = useStore(fetchUserReposFx.pending);
  const tournaments = useStore($filtredTableState);

  const config = useStore($config);
  const { setIntervalWorker } = useIntervalWorker();

  // выкидываем из сессии каждые 12 часов
  setIntervalWorker(() => {
    window.location.reload();
  }, 12 * 60 * 60 * 1000);

  const handlePasswordSubmit: OnPasswordSubmit = ({ password, login }) =>
    getConfigRequest({ alias: login, password });

  if (!config) {
    return (
      <>
        <PasswordSection onSubmit={handlePasswordSubmit} />
        <BaseFooter />
      </>
    );
  }

  return (
    <>
      <BaseHeader />
      <BaseTable data={tournaments} loading={loading} />
      <BaseFooter />
    </>
  );
};
