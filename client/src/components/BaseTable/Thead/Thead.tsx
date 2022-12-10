import { useStore } from "effector-react";
import { useCallback } from "react";
import { $tournamentsSettings } from "../../../store/Select";
import classes from "../BaseTable.module.scss";

interface TheadProps {
  setSortedKey: React.Dispatch<React.SetStateAction<string | null>>;
  sortedKey: string | null;
  setIsReverse: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Thead = ({
  setSortedKey,
  sortedKey,
  setIsReverse,
}: TheadProps) => {
  const tournamentsSettings = useStore($tournamentsSettings);

  const handleClick = useCallback(
    (newSortedKey: string) => {
      if (sortedKey === newSortedKey) {
        setIsReverse((prev) => !prev);
      } else {
        setSortedKey(newSortedKey);
      }
    },
    [sortedKey, setIsReverse, setSortedKey]
  );

  return (
    <thead className={classes.thead}>
      <tr className={classes.tr}>
        <th className={classes.th} onClick={() => handleClick("@date")}>
          Start{" "}
          {tournamentsSettings.timezoneTable
            ? `(${tournamentsSettings.timezoneTable})`
            : ""}
        </th>
        <th
          onClick={() => handleClick("@numberLateRegEndDate")}
          className={classes.th}
        >
          Late Reg
        </th>
        <th onClick={() => handleClick("@network")} className={classes.th}>
          Network
        </th>
        <th onClick={() => handleClick("@name")} className={classes.th}>
          Name
        </th>
        <th onClick={() => handleClick("@bid")} className={classes.th}>
          Buy-in
        </th>
        <th onClick={() => handleClick("@prizepool")} className={classes.th}>
          Guarantee
        </th>
        <th onClick={() => handleClick("@ability")} className={classes.th}>
          Ability
        </th>
        <th onClick={() => handleClick("@abilityBid")} className={classes.th}>
          Ability2
        </th>
        <th onClick={() => handleClick("@duration")} className={classes.th}>
          Duration
        </th>
      </tr>
    </thead>
  );
};
