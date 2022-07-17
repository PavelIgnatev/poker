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
 * Возвращае true, если турнир прошел фильтрацию по правилам коричневых
 * @param {string} level Конкретный уровень
 * @param {Object} t Экземпляр объекта t
 * @return {boolean} True, если турнир прошел фильтрацию по правилам коричневых
 */

function filterLevelByBrownRules(level, t) {
  const name = t["@name"]?.toLowerCase(),
    network = getNetwork(t["@network"]),
    isKO = t["@bounty"],
    bid = Number(t["@bid"]),
    prizepool = Number(t["@prizepool"]),
    weekDay = t["@getWeekday"],
    sat = t["@flags"]?.includes("SAT"),
    MELE = mele(bid),
    MELEI = melei(name)(bid),
    EME = eme(bid)(prizepool),
    EMEI = emei(name)(bid)(prizepool),
    MELEME = meleme(bid)(prizepool),
    EI = ei(name)(bid),
    StartDay = sd(weekDay),
    eI = I(name);

  if (network !== "PS.eu" && (t["@sng"] || t["@od"])) return false;

  if (level === "7A") {
    if (network === "888") {
    } else if (network === "PS.eu") {
      if (t["@sng"] && t["@od"] && t["@bounty"] && bid <= 33.0 && bid >= 1.0) return true;
      if (t["@sng"] || t["@od"]) return false;

      if (MELEI(1.0)(27.0)("hot")) return true;
      if (EMEI(109.0)(12000)("saturday ko [late edition")) return true;
      if (EMEI(109.0)(12000)("saturday ko [early edition")) return true;
      if (EI(82.0)("*sunday* bounty builder")) return true;
      if (MELEI(1.0)(33.0)("bounty builder turbo") && t["@od"]) return true;
      if (EI(82.0)("bounty builder") && StartDay("Sunday")) return true;
      if (EI(55.0)("marathon")) return true;
      if (EMEI(55.0)(10000)("sunday stack")) return true;
      if (EMEI(33.0)(10000)("saturday speedway [turbo")) return true;
      if (MELE(1.0)(33.0) && t["@deepstack"]) return true;
    } else if (network === "PS.es") {
    } else if (network === "GG") {
      if (
        EI(50.0)("global million") &&
        (StartDay("Friday") || StartDay("Saturday") || StartDay("Sunday")) &&
        (eI("[final ") || eI("[day"))
      )
        return true;
      if (EI(210)("zodiac bounty million") && !eI("stage")) return false;
      if (EMEI(150)(175000)("ggmasters")) return true;
    } else if (network === "WNMX") {
      if (EI(125.0)("main event - day 1e")) return true;
    } else if (network === "Chico") {
      if (EMEI(109.0)(50000) && StartDay("Sunday")) return true;
    }
  }
  if (level === "7B") {
    if (network === "888") {
    } else if (network === "PS.eu") {
      if (t["@sng"] && t["@od"] && t["@bounty"] && bid <= 11.0 && bid >= 1.0) return true;
      if (t["@sng"] || t["@od"]) return false;

      if (MELEI(1.0)(27.0)("hot")) return true;
      if (EMEI(109.0)(150000)("mini super tuesday")) return true;
      if (EMEI(109.0)(100000)("mini thursday thrill")) return true;
      if (EMEI(33.0)(10000)("saturday speedway [turbo")) return true;
      if (MELE(1.0)(27.0) && t["@deepstack"]) return true;
    } else if (network === "PS.es") {
    } else if (network === "GG") {
      if (
        EI(50.0)("global million") &&
        (StartDay("Saturday") || StartDay("Sunday")) &&
        (eI("[final") || eI("[day"))
      )
        return true;
      if (
        (EI(210)("zodiac bounty million") &&
          !(
            StartDay("Thursday") ||
            StartDay("Friday") ||
            StartDay("Saturday") ||
            StartDay("Sunday")
          )) ||
        (EI(210)("zodiac bounty million") && !eI("stage"))
      )
        return false;
      if (EMEI(150)(250000)("ggmasters")) return true;
      if (EMEI(105)(100000)("ggmasters") && StartDay("Saturday")) return true;
      if (EMEI(105)(100000)("gmasters bonus bounty")) return true;
    } else if (network === "Chico") {
      if (EME(109.0)(75000) && StartDay("Sunday")) return true;
    }
  }

  return false;
}

module.exports = { filterLevelByBrownRules };
