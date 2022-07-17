const { isSuperTurbo } = require("./isSuperTurbo");
const { isTurbo } = require("./isTurbo");

/**
 * Возвращае статус турнира
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {string} Статус турнира
 */

const getStatus = (tournament) => {
  const KO = tournament["@flags"]?.includes("B");
  const turbo = isTurbo(tournament);
  const superturbo = isSuperTurbo(tournament);
  const status = `${KO ? "KO" : "!KO"}${superturbo ? "SuperTurbo" : turbo ? "Turbo" : "Normal"}`;
  return status;
};

module.exports = { getStatus };
