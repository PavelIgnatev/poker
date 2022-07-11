/**
 * Возвращает ставку или промежуток ставки
 * @param {string} level Уровень, для которого нужно определить точную ставку или промежуток
 * @param {Object} tournament Экземпляр объекта tournament
 * @param {Object} allGaps Экземпляр объекта gap
 * @return {string} Точная ставка или промежуток ставок
 */

const getBid = (level, tournament, allGaps) => {
  let bid = tournament["@bid"];
  const network = tournament["@network"];
  const status = `${tournament["@turbo"] ? "turbo" : "normal"}`;

  const gapByBid = allGaps?.[level]?.[network]?.[status]?.[bid];
  if (gapByBid) {
    bid = gapByBid;
  }

  return bid;
};

module.exports = { getBid };
