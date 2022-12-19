
export const getWeekday = (date:number) => {
    return new Date(Number(date)).toLocaleString("en-EN", {
      weekday: "long",
    });
  };
  