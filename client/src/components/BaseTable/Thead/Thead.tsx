import { useStore } from "effector-react";
import { useCallback } from "react";
import cx from "classnames";
import { $tournamentsSettings } from "../../../store/Select";
import classes from "../BaseTable.module.scss";

interface TheadProps {
  setSortedKey: React.Dispatch<React.SetStateAction<string | null>>;
  sortedKey: string | null;
  setIsReverse: React.Dispatch<React.SetStateAction<boolean>>;
  isReverse: boolean;
}

export const Thead = ({
  setSortedKey,
  sortedKey,
  setIsReverse,
  isReverse,
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
        <th
          className={cx(classes.th, {
            [classes.active]: sortedKey === "@date",
            [classes.reverse]: isReverse,
          })}
          onClick={() => handleClick("@date")}
        >
          Start
          {tournamentsSettings.timezone?.label
            ? ` (${tournamentsSettings.timezone.label})`
            : ""}
        </th>
        <th
          onClick={() => handleClick("@numberLateRegEndDate")}
          className={cx(classes.th, {
            [classes.active]: sortedKey === "@numberLateRegEndDate",
            [classes.reverse]: isReverse,
          })}
        >
          Late Reg
        </th>
        <th
          onClick={() => handleClick("@network")}
          className={cx(classes.th, {
            [classes.active]: sortedKey === "@network",
            [classes.reverse]: isReverse,
          })}
        >
          Network
        </th>
        <th
          onClick={() => handleClick("@name")}
          className={cx(classes.th, {
            [classes.active]: sortedKey === "@name",
            [classes.reverse]: isReverse,
          })}
        >
          Name
        </th>
        <th
          onClick={() => handleClick("@bid")}
          className={cx(classes.th, {
            [classes.active]: sortedKey === "@bid",
            [classes.reverse]: isReverse,
          })}
        >
          Buy-in
        </th>
        <th
          onClick={() => handleClick("@prizepool")}
          className={cx(classes.th, {
            [classes.active]: sortedKey === "@prizepool",
            [classes.reverse]: isReverse,
          })}
        >
          Guarantee
        </th>
        <th
          onClick={() => handleClick("@ability")}
          className={cx(classes.th, {
            [classes.active]: sortedKey === "@ability",
            [classes.reverse]: isReverse,
          })}
        >
          Ability
        </th>
        <th
          onClick={() => handleClick("@abilityBid")}
          className={cx(classes.th, {
            [classes.active]: sortedKey === "@abilityBid",
            [classes.reverse]: isReverse,
          })}
        >
          Ability2
        </th>
        <th
          onClick={() => handleClick("@duration")}
          className={cx(classes.th, {
            [classes.active]: sortedKey === "@duration",
            [classes.reverse]: isReverse,
          })}
        >
          Duration
        </th>
      </tr>
    </thead>
  );
};
