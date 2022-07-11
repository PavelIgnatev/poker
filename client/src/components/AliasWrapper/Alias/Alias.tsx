import classNames from "classnames";
import { FC, useState } from "react";

import {
  fetchSettings,
  fetchStateAlias,
  postFetchAlias,
  postFetchSettings,
} from "../../../store/Settings";

import classes from "./Alias.module.scss";

type AliasProps = {
  prevState: string;
  level: string;
  minus: () => void;
};

export const Alias: FC<AliasProps> = ({ prevState, level, minus }) => {
  const [value1, setValue1] = useState<string>(prevState ?? "");

  const formData = {
    level,
    name: value1,
  };

  return (
    <div className={classes.Level}>
      <input
        placeholder="Network"
        onChange={(e) => setValue1(e.currentTarget.value ?? "")}
        value={value1}
      />

      <button
        onClick={async () => {
          await postFetchAlias({ method: "add", ...formData });
          await fetchStateAlias();
          minus();
        }}
        className={classNames(classes.button2, {
          [classes.inactive]: prevState,
        })}
      >
        Add
      </button>
      <button
        onClick={async () => {
          console.log("типо удаляю");
          await postFetchAlias({ method: "delete", ...formData });
          console.log("типо удаляю");
          await fetchStateAlias();
        }}
      >
        Delete
      </button>
    </div>
  );
};
