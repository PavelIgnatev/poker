import { FC } from "react";
import InputMask from "react-input-mask";
import classes from "./BaseInputMask.module.scss";
import { BaseInputMaskModel } from "./types";

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
        onChange={(e) => handleChange(e.currentTarget.value)}
        className={className}
        value={value}
        maskPlaceholder={"00"}
      />
    </div>
  );
};
