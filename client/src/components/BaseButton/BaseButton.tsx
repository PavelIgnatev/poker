import { FC } from "react";
import cx from "classnames";
import classes from "./BaseButton.module.scss";

interface BaseButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}

// todo все пропсы для обычной кнопки, и вписать их в типы как наследование, а не каждый отдельно
export const BaseButton: FC<BaseButtonProps> = ({ onClick, className, children, disabled }) => {
  return (
    <button className={cx(classes.button, className)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
