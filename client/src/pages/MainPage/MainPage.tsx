import { FC } from "react";
import { useStore } from "effector-react";

import { BaseTable } from "../../components/BaseTable/BaseTable";
import { BaseHeader } from "../../components/BaseHeader/BaseHeader";
import { $tableStateFiltred, fetchUserReposFx } from "../../store/TableStore";

export const MainPage: FC = () => {
  const loading = useStore(fetchUserReposFx.pending);
  const data = useStore($tableStateFiltred);

  return (
    <>
      <BaseHeader />
      <BaseTable data={data} loading={loading} />
    </>
  );
};
