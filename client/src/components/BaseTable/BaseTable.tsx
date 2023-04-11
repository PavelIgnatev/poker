import { FC, useMemo, useState } from "react";
import { Thead } from "./Thead";
import { Tbody } from "./Tbody/Tbody";
import { Loader } from "../Loader/Loader";

import classes from "./BaseTable.module.scss";
import { useStore } from "effector-react";
import { $config } from "../../store/Config";
import { TextTier } from "../TextTier";

type Effmu = "A" | "B" | "C";

type BaseTableProps = {
  data?: Array<Record<string, any>>;
  loading: boolean;
};

export const BaseTable: FC<BaseTableProps> = ({ data, loading }) => {
  const [sortedKey, setSortedKey] = useState<string | null>("@date");
  const [isReverse, setIsReverse] = useState(false);
  const { networks = {} } = useStore($config) ?? {};

  const levelAndEffmu = useMemo(() => {
    const first = ["A", 'B', "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"]
    const second = ["C", "B", "A", "SuperA"]

    let minFirstLetter = Infinity
    let minSecondLetter = Infinity

    const keys = Object.keys(networks)
    for(let key in keys) {
      const network = keys[key]

      const {level, effmu} = networks[network]

      const firstLetterIndex = first.findIndex(letter => String(level) === letter)
      const secondLetterIndex = second.findIndex(letter => String(effmu) === letter)

      if(firstLetterIndex < minFirstLetter) {
        minFirstLetter = firstLetterIndex
      }

      if(secondLetterIndex < minSecondLetter) {
        minSecondLetter = secondLetterIndex
      }
    }

    return `${first[minFirstLetter]}${second[minSecondLetter]}`
  }, [networks])

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
      <TextTier levelAndEffmu={levelAndEffmu} />

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
