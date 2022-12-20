/**
 * Возвращает utc hours
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {string} День, месяц и точное время или "-"
 */

const getESTHours = (tournament, duration = 0) => {
  const isStartDate = tournament["@date"] ?? 0;
  const startDate = Number(isStartDate * 1000 - duration);

  return new Date(Number(startDate)).toLocaleString("en-EN", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    timeZone: 'UTC'
  });
};

module.exports = { getESTHours };
