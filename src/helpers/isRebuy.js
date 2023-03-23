/**
 * Возвращае true, если турнир является satellite
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир является super turbo
 */

const isRebuy = (tournament) => {
  return tournament["@flags"]?.includes("R") && !tournament["@flags"]?.includes("RH");
};

module.exports = { isRebuy };
