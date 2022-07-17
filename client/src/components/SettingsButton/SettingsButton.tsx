import { FC } from 'react';
import classes from './SettingsButton.module.scss';

export const SettingsButton: FC<{ handleClick: () => void }> = ({ handleClick }) => {
  return (
    <div className={classes.wrapper} onClick={handleClick}>
      <div title="Update" className={classes.btn} />
    </div>
  );
};
