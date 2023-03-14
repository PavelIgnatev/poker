import { FC, useState } from "react";
import { Thead } from "./Thead";
import { Tbody } from "./Tbody/Tbody";
import { Loader } from "../Loader/Loader";

import classes from "./BaseTable.module.scss";

type BaseTableProps = {
  data?: Array<Record<string, any>>;
  loading: boolean;
};

export const BaseTable: FC<BaseTableProps> = ({ data, loading }) => {
  const [sortedKey, setSortedKey] = useState<string | null>("@date");
  const [isReverse, setIsReverse] = useState(false);

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
