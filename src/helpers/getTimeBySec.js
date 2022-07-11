/**
 * Возвращает часы, минуты и секунды из секунд
 * @param {number} timestamp количество секунд
 * @return {string} Часы : минуты : секунды
 */

const getTimeBySec = (timestamp) => {
  let hours = Math.floor(timestamp / 60 / 60);
  let minutes = Math.floor(timestamp / 60) - hours * 60;
  let seconds = timestamp % 60;

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
};

module.exports = { getTimeBySec };
