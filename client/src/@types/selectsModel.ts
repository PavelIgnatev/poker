export type selectModel = {
  value: string;
  label: string;
  moneyStart?: number;
  moneyEnd?: number;
};

export type SelectOption<T> = {
  value: T;
  label: string | number;
};

export type selectedModel = selectModel[] | null;
