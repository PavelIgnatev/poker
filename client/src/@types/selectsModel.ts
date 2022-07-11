export type selectModel = {
  value: string;
  label: string;
  moneyStart?: number;
  moneyEnd?: number;
};

export type selectedModel = selectModel[] | null;
