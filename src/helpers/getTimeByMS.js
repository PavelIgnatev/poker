/**
 * Возвращает часы и минуты из миллисекунд
 * @param {number} timestamp количество миллисекунд
 * @return {string} Часы : минуты
 */

const getTimeByMS = (timestamp) => {
  return new Date(Number(timestamp))
    .toLocaleString("en-EN", {
      hour12: false,
      timeZone: "Europe/Moscow",
      hour: "numeric",
      minute: "numeric",
    })
    .replace("24", "00");
};

module.exports = { getTimeByMS };
