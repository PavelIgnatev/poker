/**
 * Возвращает полную дату для таймзоны America/New_York
 * @param {Date} date Экземпляр объекта Date
 * @return {string} День, месяц и точное время
 */

const getDate = (date) => {
  return new Date(Number(date))
    .toLocaleString("en-EN", {
      hour12: false,
      timeZone: "America/New_York",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
    })
    .replace(", 24", ", 00");
};

module.exports = { getDate };
