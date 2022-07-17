const { getDate } = require("./getDate");

/**
 * Возвращае sheduled date
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {string} День, месяц и точное время или "-"
 */

const getSheduledDate = (tournament) => {
  const isStartDate = tournament["@date"] ?? 0;
  const startDate = Number(isStartDate * 1000);
  return isStartDate ? getDate(startDate) : "-";
};

module.exports = { getSheduledDate };
