import { createApi } from 'effector';
import { $alias } from './state';

export const { handleChangeAlias } = createApi($alias, {
  handleChangeAlias: (_: string, v: string) => v,
});
