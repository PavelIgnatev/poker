import { FC } from "react";
import classes from "./BaseInputNumber.module.scss";
import { BaseInputNumberModel } from "./types";

import classnames from "classnames";

export const BaseInputNumber: FC<BaseInputNumberModel> = ({
  handleChange,
  value,
  placeholder,
  className,
  disabled,
  max = 9999,
}) => {
  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    if (
      value &&
      value !== "-" &&
      !/^(0$|-?[1-9]\d*(\.\d*[1-9]$)?|-?0\.\d*[1-9])$/.test(e.currentTarget.value)
    )
      return value;

    handleChange(Number(value) > max ? String(max) : Number(value) < -max ? `-${max}` : value);
  }

  return (
    <div className={classes.BaseInput}>
      <input
        id={placeholder}
        {...{ value, onChange }}
        placeholder={placeholder}
        className={classnames(className, classes.input)}
        disabled={disabled}
      />
    </div>
  );
};
