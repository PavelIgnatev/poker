import b_ from "b_";
import cx from "classnames";
import { CSSProperties, FC } from "react";

import "./BaseButton.scss";

interface BaseButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  clear?: boolean;
  red?: boolean;
  green?: boolean;
  autoFocus?: boolean;
  style?: CSSProperties;
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
  style,
}) => {
  return (
    <button
      className={cx(b({ clear, red, green }), className)}
      onClick={onClick}
      disabled={disabled}
      style={style}
      autoFocus={autoFocus}
    >
      {children}
    </button>
  );
};
