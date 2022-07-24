import { FC } from "react";
import { useStore } from "effector-react";

import { BaseTable } from "../../components/BaseTable";
import { BaseHeader } from "../../components/BaseHeader";
import { $tableState, fetchUserReposFx } from "../../store/Table";
import { $config, getConfigRequest } from "../../store/Config";
import { OnPasswordSubmit, PasswordSection } from "../../components/PasswordSection";

export const MainPage: FC = () => {
  const loading = useStore(fetchUserReposFx.pending);
  const tournaments = useStore($tableState);
  const config = useStore($config);

  const handlePasswordSubmit: OnPasswordSubmit = ({ password, login }) =>
    getConfigRequest({ alias: login, password });

  if (!config) {
    return <PasswordSection onSubmit={handlePasswordSubmit} />;
  }

  return (
    <>
      <BaseHeader />
      <BaseTable data={tournaments} loading={loading} />
    </>
  );
};
