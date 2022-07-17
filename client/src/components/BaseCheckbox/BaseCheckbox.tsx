import b from 'b_';
import { FC } from 'react';
import { BaseCheckboxModel } from './types';
import cx from 'classnames';
import classes from './BaseCheckbox.module.scss';

export const BaseCheckbox: FC<BaseCheckboxModel> = (props) => {
  const { className, selected, onClick, children } = props;

  return (
    <div
      className={cx(classes.checkbox, classes[b('selected', { selected })], className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
