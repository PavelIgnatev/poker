
export const getWeekday = (date:any) => {
    return new Date(date).toLocaleString("en-EN", {
      weekday: "long",
      timeZone: 'UTC'
    });
  };
  