
export const getDate = (date:any) => {
    return new Date(date)
      .toLocaleString("en-EN", {
        hour12: false,
        day: "numeric",
        month: "short",
        hour: "numeric",
        timeZone: 'UTC',
        minute: "numeric",
      })
      .replace(", 24", ", 00");
  };
  
  