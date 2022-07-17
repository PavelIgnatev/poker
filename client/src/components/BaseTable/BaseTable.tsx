import { FC } from 'react';
import { Thead } from './Thead';
import { Tbody } from './Tbody/Tbody';
import { Loader } from '../Loader/Loader';
import classes from './BaseTable.module.scss';
import { tableCellModel } from '../../@types/tableCellModel';

type BaseTableProps = {
  data: tableCellModel[] | undefined;
  loading: boolean;
};

export const BaseTable: FC<BaseTableProps> = ({ data, loading }) => {
  if (!data?.length) return <section className={classes.nodata}>Nothing found</section>;

  if (loading)
    return (
      <section className={classes.section}>
        <Loader />
      </section>
    );

  if (!data)
    return (
      <section className={classes.nodata}>
        Select the options you are interested in and click the "Update" button
      </section>
    );

  return (
    <section className={classes.section}>
      <table className={classes.table}>
        <Thead />
        <Tbody data={data} />
      </table>
    </section>
  );
};
