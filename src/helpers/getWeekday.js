/**
 * Возвращает день недели для таймзоны Europe/Moscow
 * @param {Date} date Экземпляр объекта Date
 * @return {string} День недели
 */

const getWeekday = (date) => {
  return new Date(Number(date)).toLocaleString('en-EN', {
    timeZone: 'Europe/Moscow',
    weekday: 'long',
  });
};

module.exports = { getWeekday };
