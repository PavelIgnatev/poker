/**
 * Возвращает день недели для таймзоныAmerica/New_York
 * @param {Date} date Экземпляр объекта Date
 * @return {string} День недели
 */

const getWeekday = (date) => {
  return new Date(Number(date)).toLocaleString("en-EN", {
    timeZone: "America/New_York",
    weekday: "long",
  });
};

module.exports = { getWeekday };
