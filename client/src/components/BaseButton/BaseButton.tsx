import { FC } from 'react';
import cx from 'classnames';
import classes from './BaseButton.module.scss';

interface BaseButtonProps {
  onClick: () => void;
  className?: string;
}

export const BaseButton: FC<BaseButtonProps> = ({ onClick, className, children }) => {
  return (
    <button className={cx(classes.button, className)} onClick={onClick}>
      {children}
    </button>
  );
};
