import classNames from "classnames";
import { FC, ChangeEventHandler } from "react";
import "./BaseInputString.scss";

type BaseInputStringProps = {
  value: string | undefined;
  onChange: (v: string) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
};

export const BaseInputString: FC<BaseInputStringProps> = ({
  onChange,
  className,
  value,
  disabled,
  placeholder,
}) => {
  return (
    <input
      className={classNames("BaseInputString", className)}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};
