import { FC } from 'react';
import classes from './UpdateButton.module.scss';
import { fetchUserReposFx } from '../../store/Table/init';

export const UpdateButton: FC = () => {
  return (
    <div className={classes.wrapper} onClick={() => fetchUserReposFx()}>
      <div title="Update" className={classes.btn} />
    </div>
  );
};
