/**
 * Возвращае true, если турнир является satellite
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир является super turbo
 */

const { getNetwork } = require("./getNetwork");

const isRebuy = (tournament) => {
  const name = tournament["@name"]?.toLowerCase();
  const network = getNetwork(tournament["@network"]);

  return network === "888"
    ? name?.includes("r&a")
    : tournament["@flags"]?.includes("R") && !tournament["@flags"]?.includes("RH");
};

module.exports = { isRebuy };
