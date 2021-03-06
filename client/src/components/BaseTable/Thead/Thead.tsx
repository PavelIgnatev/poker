import { useStore } from "effector-react";
import { FC } from "react";
import { $tournamentsSettings } from "../../../store/Select";
import classes from "../BaseTable.module.scss";

export const Thead: FC = () => {
  const tournamentsSettings = useStore($tournamentsSettings);

  return (
    <thead className={classes.thead}>
      <tr className={classes.tr}>
        <th className={classes.th}>
          Start {tournamentsSettings.timezoneTable ? `(${tournamentsSettings.timezoneTable})` : ""}
        </th>
        <th className={classes.th}>Late Reg</th>
        <th className={classes.th}>Network</th>
        <th className={classes.th}>Name</th>
        <th className={classes.th}>Buy-in</th>
        <th className={classes.th}>Guarantee</th>
        <th className={classes.th}>Ability</th>
        <th className={classes.th}>Ability2</th>
        <th className={classes.th}>Duration</th>
      </tr>
    </thead>
  );
};
