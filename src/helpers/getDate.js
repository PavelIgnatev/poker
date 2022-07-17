/**
 * Возвращает полную дату для таймзоны Europe/Moscow
 * @param {Date} date Экземпляр объекта Date
 * @return {string} День, месяц и точное время
 */

const getDate = (date) => {
  return new Date(Number(date))
    .toLocaleString("en-EN", {
      hour12: false,
      timeZone: "Europe/Moscow",
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "numeric",
    })
    .replace(", 24", ", 00");
};

module.exports = { getDate };
