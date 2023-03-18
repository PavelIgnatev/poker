import { useStore } from "effector-react";

import { $config, getConfigRequest } from "../../store/Config";
import {
  OnPasswordSubmit,
  PasswordSection,
} from "../../components/PasswordSection";
import { useIntervalWorker } from "../../hooks/useIntervalWorker";
import { BaseSettings } from "../../components/BaseSettings";
import { BaseTournaments } from "../../components/BaseTournaments";

export const MainPage = () => {
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
      </>
    );
  }

  return (
    <>
      <div>
        <BaseSettings />
        <BaseTournaments />
      </div>
    </>
  );
};
