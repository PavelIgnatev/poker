export type PagerModel = {
  state: any;
  prevState: {
    [key: string]:
      | {
          network: string;
          level: string;
          currency: string;
          bid: string;
          status: string;
          name: string;
          ability: string;
        }[]
      | null;
  };
};
