import { FC, useState } from "react";
import { Thead } from "./Thead";
import { Tbody } from "./Tbody/Tbody";
import { Loader } from "../Loader/Loader";
import { BaseSelect } from "../BaseSelect";
import { EFFMU } from "../../store/Select";
import classes from "./BaseTable.module.scss";

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
  const [sortedKey, setSortedKey] = useState<string | null>(null);
  const [isReverse, setIsReverse] = useState(false);
  const [effmu, setEffmu] = useState<Effmu | null>(null);
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
      <BaseSelect
        options={EFFMU}
        placeholder="Select the effmu value you are interested in to get information"
        onChange={(e) => setEffmu((e?.value) as Effmu)}
        className={classes.select}
      />
      {effmu && <div className={classes.effmu}>{textTierOptions[effmu]}</div>}
      <table id="grid" className={classes.table}>
        <Thead
          setSortedKey={setSortedKey}
          sortedKey={sortedKey}
          setIsReverse={setIsReverse}
        />
        <Tbody data={data} sortedKey={sortedKey} isReverse={isReverse} />
      </table>
    </section>
  );
};
