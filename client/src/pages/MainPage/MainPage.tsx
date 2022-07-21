import { FC } from "react";
import { useStore } from "effector-react";

import { BaseTable } from "../../components/BaseTable";
import { BaseHeader } from "../../components/BaseHeader";
import { $filtredTournamentsState, fetchUserReposFx } from "../../store/Table";
// import { AliasSection } from "../../components/AliasSection";
import { $config } from "../../store/Config";

export const MainPage: FC = () => {
  const loading = useStore(fetchUserReposFx.pending);
  const tournaments = useStore($filtredTournamentsState);
  const config = useStore($config);

  return (
    <>
      {!config ? // <AliasSection />
      null : (
        <>
          <BaseHeader />
          <BaseTable data={tournaments} loading={loading} />
        </>
      )}
    </>
  );
};
