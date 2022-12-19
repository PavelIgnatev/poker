
export const getDate = (date:number) => {
    return new Date(Number(date))
      .toLocaleString("en-EN", {
        hour12: false,
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
      })
      .replace(", 24", ", 00");
  };
  
  