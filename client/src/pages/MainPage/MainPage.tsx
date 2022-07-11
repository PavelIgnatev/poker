import { FC } from "react";
import { useStore } from "effector-react";

import { BaseTable } from "../../components/BaseTable/BaseTable";
import { BaseHeader } from "../../components/BaseHeader/BaseHeader";
import { $filtredTournamentsState, fetchUserReposFx } from "../../store/Table";

export const MainPage: FC = () => {
  const loading = useStore(fetchUserReposFx.pending);
  const tournaments = useStore($filtredTournamentsState);

  return (
    <>
      <BaseHeader />
      <BaseTable data={tournaments} loading={loading} />
    </>
  );
};
