/**
 * Возвращае true, если турнир является normal
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир является normal
 */

const isNormal = (tournament) => {
  const name = (tournament["@name"] ?? "").toLowerCase();

  return !!(tournament["@flags"]?.includes("B") || name?.includes("bounty"));
};

module.exports = { isNormal };
