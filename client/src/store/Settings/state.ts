import { createStore } from 'effector';
import { settingsModel } from './../../@types/settingsModel';

export const $settings = createStore<settingsModel | null>(null);
