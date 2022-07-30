import b_ from "b_";
import cx from "classnames";
import { FC } from "react";

import "./BaseButton.scss";

interface BaseButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  clear?: boolean;
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
  autoFocus,
}) => {
  return (
    <button
      className={cx(b({ clear }), className)}
      onClick={onClick}
      disabled={disabled}
      autoFocus={autoFocus}
    >
      {children}
    </button>
  );
};
