import { FC, useMemo, useState } from "react";
import { Thead } from "./Thead";
import { Tbody } from "./Tbody/Tbody";
import { Loader } from "../Loader/Loader";

import classes from "./BaseTable.module.scss";
import { useStore } from "effector-react";
import { $config } from "../../store/Config";
import { TextTier } from "../TextTier";

type Effmu = "A" | "B" | "C";

const textTierOptions: Record<Effmu, string> = {
  A: "TIER A: Enter and/or re-enter if you will have: 50+ big blinds in KO's, 10+ big blinds in non-KO's with 1,500+ entrants, >40 or <15 big blinds in non-KO's with 1499- entrants",
  B: "TIER B: Enter and/or re-enter if you will have: 50+ big blinds in any on-stake tournament (unless ONE BULLET is specified)",
  C: "TIER C: Enter if you will have 50+ big blinds in any on-stake tournament. Re-Enter if you will have 50+ big blinds AND there are 2,000+ entrants (unless ONE BULLET is specified)",
};

type BaseTableProps = {
  data?: Array<Record<string, any>>;
  loading: boolean;
};

export const BaseTable: FC<BaseTableProps> = ({ data, loading }) => {
  const [sortedKey, setSortedKey] = useState<string | null>("@date");
  const [isReverse, setIsReverse] = useState(false);
  const { networks = {} } = useStore($config) ?? {};

  const effmu = useMemo(
    () =>
      Object.keys(networks).reduce(
        (acc, network) =>
          acc > networks[network].effmu ? acc : networks[network].effmu,
        "A"
      ),
    [networks]
  ) as Effmu;

  if (loading)
    return (
      <section className={classes.section}>
        <Loader />
      </section>
    );

  if (!data?.length)
    return <section className={classes.nodata}>Nothing found</section>;

  if (!data)
    return (
      <section className={classes.nodata}>
        Select the options you are interested in and click the "Update" button
      </section>
    );

  return (
    <section className={classes.section}>
      <TextTier effmu={effmu} />

      <table id="grid" className={classes.table}>
        <Thead
          setSortedKey={setSortedKey}
          sortedKey={sortedKey}
          setIsReverse={setIsReverse}
          isReverse={isReverse}
        />
        <Tbody data={data} sortedKey={sortedKey} isReverse={isReverse} />
      </table>
    </section>
  );
};
