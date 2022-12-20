export const getTimeByMS = (timestamp:any) => {
    return new Date(timestamp)
      .toLocaleString("en-EN", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        timeZone: 'UTC'
      })
      .replace("24", "00");
  };
  