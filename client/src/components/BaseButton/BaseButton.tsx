import b_ from "b_";
import cx from "classnames";
import { FC } from "react";

import "./BaseButton.scss";

interface BaseButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  clear?: boolean;
  red?: boolean;
  green?: boolean;
  autoFocus?: boolean;
}

const b = b_.with("base-button");

// todo все пропсы для обычной кнопки, и вписать их в типы как наследование, а не каждый отдельно
export const BaseButton: FC<BaseButtonProps> = ({
  onClick,
  className,
  children,
  disabled,
  clear,
  red,
  green,
  autoFocus,
}) => {
  return (
    <button
      className={cx(b({ clear, red, green }), className)}
      onClick={onClick}
      disabled={disabled}
      autoFocus={autoFocus}
    >
      {children}
    </button>
  );
};
