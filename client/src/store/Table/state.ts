import { createStore } from 'effector';
import { tableCellModel } from '../../@types/tableCellModel';
import { $dateEnd, $dateStart } from '../Select';

export const $tableState = createStore<tableCellModel[] | null>(null);

// Отфильтрованный стейт в зависимости от dateStart и dateEnd
export const $filtredTournamentsState = $tableState.map((el) =>
  el?.filter((item) => {
    const startDate = item?.['@scheduledStartDate'] ?? '-';
    const dateStart = $dateStart.getState();
    const dateEnd = $dateEnd.getState();

    if (startDate === '-') return true;

    const res = startDate?.split(', ')?.[1]?.split(':')?.[0];
    const r = dateEnd === '00' && dateStart <= dateEnd ? '24' : dateEnd;

    return dateStart <= dateEnd
      ? dateStart <= res && res <= r
      : !(dateStart > res && res > dateEnd);
  }),
);
