import { FC } from "react";
import { BaseCheckboxModel } from "./types";
import classes from "./BaseCheckbox.module.scss";

export const BaseCheckbox: FC<BaseCheckboxModel> = (props) => {
  const { label, className, ...other } = props;
  return (
    <div className={className}>
      <label
        htmlFor={label}
        style={{ userSelect: "none" }}
        className={classes.label}
      >
        {label}
      </label>
      <div className={classes.inputWrapper}>
        <input
          id={label}
          type="checkbox"
          {...other}
          style={{ opacity: 0, display: "none" }}
        />
        <label htmlFor={label} className={classes.checkbox} />
      </div>
    </div>
  );
};
