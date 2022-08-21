/**
 * Возвращает utc hours
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {string} День, месяц и точное время или "-"
 */

const getESTHours = (tournament) => {
  const isStartDate = tournament["@date"] ?? 0;
  const startDate = Number(isStartDate * 1000);

  return new Date(Number(startDate))
    .toLocaleString("en-EN", {
      hour12: false,
      timeZone: "America/New_York",
      hour: "numeric",
    })
    .replace(", 24", ", 00");
};

module.exports = { getESTHours };
