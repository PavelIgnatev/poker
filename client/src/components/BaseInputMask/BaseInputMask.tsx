import { FC } from "react";
import InputMask from "react-input-mask";
import classes from "./BaseInputMask.module.scss";
import { BaseInputMaskModel } from "./types";
import cx from "classnames";

export const BaseInputMask: FC<BaseInputMaskModel> = ({
  placeholder,
  handleChange,
  value,
  className,
}) => {
  return (
    <div className={classes.BaseInputMask}>
      <label htmlFor={placeholder} className={classes.label}>
        {placeholder}:
      </label>
      <InputMask
        id={placeholder}
        mask="99"
        onChange={(e) => {
          return handleChange(e.currentTarget.value);
        }}
        className={cx(classes.input, className)}
        value={value ?? 0}
        maskPlaceholder={"00"}
      />
    </div>
  );
};
