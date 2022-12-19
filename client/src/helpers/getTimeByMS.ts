export const getTimeByMS = (timestamp:number) => {
    return new Date(Number(timestamp))
      .toLocaleString("en-EN", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
      })
      .replace("24", "00");
  };
  