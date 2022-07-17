import { createStore } from 'effector';

export const $password = createStore<string>('');
export const $isValidPassword = createStore<boolean>(false);
