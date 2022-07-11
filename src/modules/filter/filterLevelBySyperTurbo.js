const {
  MELE: mele,
  MELEI: melei,
  EME: eme,
  EMEI: emei,
  MELEME: meleme,
  EI: ei,
  StartDay: sd,
  I,
} = require("../../helpers/curry");
const { getNetwork } = require("../../helpers/getNetwork");

/**
 * Возвращае true, если турнир прошел фильтрацию по правилам super turbo
 * @param {string} level Конкретный уровень
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир прошел фильтрацию по правилам super turbo
 */

function filterLevelBySyperTurbo(level, t) {
  const name = t["@name"]?.toLowerCase(),
    network = getNetwork(t["@network"]),
    isKO = t["@bounty"],
    bid = Number(t["@bid"]),
    prizepool = Number(t["@prizepool"]),
    weekDay = t["@getWeekday"],
    MELE = mele(bid),
    MELEI = melei(name)(bid),
    EME = eme(bid)(prizepool),
    EMEI = emei(name)(bid)(prizepool),
    MELEME = meleme(bid)(prizepool),
    EI = ei(name)(bid),
    StartDay = sd(weekDay),
    eI = I(name);

  if (t["@superturbo"]) {
    if (level === "7A") {
      if (network === "888") {
      } else if (network === "PS.eu") {
        if (EME(8.88)(5000)) return true;
      } else if (network === "PS.es") {
      } else if (network === "GG") {
      } else if (network === "WNMX") {
      } else if (network === "WPN") {
      }
    }
    if (level === "7B") {
      if (network === "888") {
      } else if (network === "PS.eu") {
        if (EME(8.88)(8000)) return true;
      } else if (network === "PS.es") {
      } else if (network === "GG") {
      } else if (network === "WNMX") {
      } else if (network === "WPN") {
      }
    }
  }

  return false;
}

module.exports = { filterLevelBySyperTurbo };
