import classNames from 'classnames';
import { FC, ChangeEventHandler } from 'react';
import classes from './BaseInputString.module.scss';

type BaseInputStringProps = {
  value: string;
  onChange: (v: string) => void;
  className?: string;
};

export const BaseInputString: FC<BaseInputStringProps> = ({ onChange, className, value }) => {
  return (
    <input
      className={classNames(className, classes.input)}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};
