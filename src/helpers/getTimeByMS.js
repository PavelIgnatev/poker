/**
 * Возвращает часы и минуты из миллисекунд
 * @param {number} timestamp количество миллисекунд
 * @return {string} Часы : минуты
 */

const getTimeByMS = (timestamp) => {
  return new Date(Number(timestamp))
    .toLocaleString("en-EN", {
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      timeZone: 'UTC'
    })
    .replace("24", "00");
};

module.exports = { getTimeByMS };
