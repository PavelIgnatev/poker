/**
 * Возвращает день недели для таймзоны
 * @param {Date} date Экземпляр объекта Date
 * @return {string} День недели
 */

const getWeekday = (date) => {
  return new Date(Number(date)).toLocaleString("en-EN", {
    weekday: "long",
    timeZone: 'UTC'
  });
};

module.exports = { getWeekday };
