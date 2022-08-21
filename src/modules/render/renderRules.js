const { renderCheck } = require("./renderCheck");
const { renderRule } = require("./renderRule");

function renderRules(rules) {
  return `const { getNetwork } = require("../../helpers/getNetwork");
  const {
    MELE: mele,
    MELEI: melei,
    EME: eme,
    EMEI: emei,
    MELEME: meleme,
    EI: ei,
    StartDay: sd,
    FLAGS: flags,
    I,
  } = require("../../helpers/curry");
  const { isSuperTurbo: isSuperTurboS } = require("../../helpers/isSuperTurbo");
  const { isTurbo: isTurboS } = require("../../helpers/isTurbo.js");
  const { isOffpeak: isOffpeakQ } = require("../../helpers/isOffpeak");
  
  /**
   * Возвращае true, если турнир прошел фильтрацию по правилам уровня
   * @param {string} level Конкретный уровень
   * @param {Object} tournament Экземпляр объекта tournament
   * @return {boolean} True, если турнир прошел фильтрацию по правилам уровня
   */
  
  const filterLevelByRules = (level, tournament) => {
    const name = tournament["@name"]?.toLowerCase(),
      network = getNetwork(tournament["@network"]),
      isKO = tournament["@bounty"],
      bid = Number(tournament["@bid"]),
      prizepool = Number(tournament["@prizepool"]),
      weekDay = tournament["@getWeekday"],
      MELE = mele(bid),
      MELEI = melei(name)(bid),
      EME = eme(bid)(prizepool),
      EMEI = emei(name)(bid)(prizepool),
      MELEME = meleme(bid)(prizepool),
      EI = ei(name)(bid),
      StartDay = sd(weekDay),
      eI = I(name),
      FLAGS = flags(tournament);
  
    const isTurbo = isTurboS(tournament);
    const isOffpeak = isOffpeakQ(tournament);
    const isSuperTurbo = isSuperTurboS(tournament);
    const isKo = tournament["@bounty"];
    const isNormal = !isTurbo && !isSuperTurbo;
  
    if (!name) return false;
  
    //Фильтр снг для румов, отличных от PS.eu
    if (network !== "PS.eu" && tournament["@sng"]) return false;
    ${rules
      .map((rule) => {
        const isArray = Array.isArray(rule);

        if (isArray) {
          return renderCheck(rule.map(renderRule).join(" && "));
        }

        return renderCheck(renderRule(rule));
      })
      .join("")}
    
    return false;
  };
  
  module.exports = {
    filterLevelByRules,
  };`;
}
module.exports = { renderRules };
