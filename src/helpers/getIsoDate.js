



const getIsoDate = () => {
  const currentTime = new Date(
    new Date(Date.now()).toLocaleString("en-EN", {
      timeZone: "UTC",
    }),
  );

  const year = currentTime.getFullYear();
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const date = `${year}-${month}-${day}`;
  return date
}

module.exports = { getIsoDate };