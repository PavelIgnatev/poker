const {
  MELE: mele,
  MELEI: melei,
  EME: eme,
  EMEI: emei,
  MELEME: meleme,
  TEMEI: temei,
  EI: ei,
  StartDay: sd,
  I,
} = require("../../helpers/curry");
const { getNetwork } = require("../../helpers/getNetwork");

/**
 * Возвращае true, если турнир прошел фильтрацию по правилам satellit
 * @param {string} level Конкретный уровень
 * @param {Object} tournament Экземпляр объекта tournament
 * @return {boolean} True, если турнир прошел фильтрацию по правилам satellit
 */

function filterLevelBySat(level, t) {
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
    TEMEI = temei(name)(bid)(t["@tickets"] ?? 0),
    MELEME = meleme(bid)(prizepool),
    EI = ei(name)(bid),
    StartDay = sd(weekDay),
    eI = I(name);

  if (sat && !t["@superturbo"]) {
    if (level === "7A") {
      if (network === "888") {
        if (EMEI(22.0)(1090)("big shot 109")) return true;
        if (EMEI(22.0)(1090)("109 sunday million")) return true;
        if (EMEI(16.5)(3270)("big shot 109")) return true;
        if (EMEI(16.5)(3270)("109 sunday million")) return true;

        if (TEMEI(22.0)(10)("big shot 109")) return true;
        if (TEMEI(22.0)(10)("109 sunday million")) return true;
        if (TEMEI(16.5)(30)("big shot 109")) return true;
        if (TEMEI(16.5)(30)("109 sunday million")) return true;
      } else if (network === "PS.eu") {
        if (!t["@turbo"]) {
          if (EI(16.5)("109 sunday million")) return true;
          if (EI(16.5)("sunday million $109")) return true;

          if (TEMEI(16.5)(10)("109 sunday million")) return true;
          if (TEMEI(16.5)(10)("sunday million $109")) return true;
        }
        if (EI(11.0)("109 sunday million")) return true;
        if (EI(11.0)("sunday million $109")) return true;
        if (EI(5.5)("109 sunday million")) return true;
        if (EI(5.5)("sunday million $109")) return true;

        if (TEMEI(11.0)(10)("109 sunday million")) return true;
        if (TEMEI(11.0)(10)("sunday million $109")) return true;
        if (TEMEI(5.5)(10)("109 sunday million")) return true;
        if (TEMEI(5.5)(10)("sunday million $109")) return true;
      } else if (network === "PS.es") {
        if (!t["@turbo"]) {
          if (EI(20.0)("100 sunday special")) return true;
          if (EI(10.0)("100 sunday special")) return true;
        }
      } else if (network === "GG") {
        if (
          EI(50.0)("global million") &&
          (StartDay("Friday") || StartDay("Saturday") || StartDay("Sunday")) &&
          (eI("[final ") || eI("[day"))
        )
          return true;

        if (!t["@turbo"]) {
          if (EMEI(30.0)(3000)("ggmasters $150")) return true;
          if (EMEI(30.0)(3000)("150 ggmasters")) return true;
          if (EMEI(15.0)(2250)("ggmasters $150")) return true;
          if (EMEI(15.0)(2250)("150 ggmasters")) return true;

          if (TEMEI(30.0)(20)("ggmasters $150")) return true;
          if (TEMEI(30.0)(20)("150 ggmasters")) return true;
          if (TEMEI(15.0)(15)("ggmasters $150")) return true;
          if (TEMEI(15.0)(15)("150 ggmasters")) return true;
        }
      } else if (network === "WNMX") {
        if (!t["@turbo"]) {
          if (EI(30.0)("seats to €250")) return true;
          if (EI(10.0)("seats to €50")) return true;
        }
      } else if (network === "WPN") {
        if (!t["@turbo"]) {
          if (EI(10.5)("sundaysqueeze") && EI(10.5)("freezeout [flight]")) return true;
          if (EI(22.0)("doubledeuce") && EI(22.0)("[flight]")) return true;
        }
      }
    }
    if (level === "7B") {
      if (network === "888") {
        if (EMEI(22.0)(1090)("big shot 109")) return true;
        if (EMEI(22.0)(1090)("109 sunday million")) return true;
        if (EMEI(16.5)(3270)("big shot 109")) return true;
        if (EMEI(16.5)(3270)("109 sunday million")) return true;

        if (TEMEI(22.0)(10)("big shot 109")) return true;
        if (TEMEI(22.0)(10)("109 sunday million")) return true;
        if (TEMEI(16.5)(30)("big shot 109")) return true;
        if (TEMEI(16.5)(30)("109 sunday million")) return true;
      } else if (network === "PS.eu") {
        if (!t["@turbo"]) {
          if (EI(16.5)("109 sunday million")) return true;
          if (EI(16.5)("sunday million $109")) return true;

          if (TEMEI(16.5)(10)("109 sunday million")) return true;
          if (TEMEI(16.5)(10)("sunday million $109")) return true;
        }
        if (EI(11.0)("109 sunday million")) return true;
        if (EI(11.0)("sunday million $109")) return true;
        if (EI(5.5)("109 sunday million")) return true;
        if (EI(5.5)("sunday million $109")) return true;

        if (TEMEI(11.0)(10)("109 sunday million")) return true;
        if (TEMEI(11.0)(10)("sunday million $109")) return true;
        if (TEMEI(5.5)(10)("109 sunday million")) return true;
        if (TEMEI(5.5)(10)("sunday million $109")) return true;
      } else if (network === "PS.es") {
        if (!t["@turbo"]) {
          if (EI(20.0)("100 sunday special")) return true;
          if (EI(10.0)("100 sunday special")) return true;
        }
      } else if (network === "GG") {
        if (
          EI(50.0)("global million") &&
          (StartDay("Saturday") || StartDay("Sunday")) &&
          (eI("[final") || eI("[day"))
        )
          return true;

        if (!t["@turbo"]) {
          if (EMEI(30.0)(3000)("ggmasters $150")) return true;
          if (EMEI(30.0)(3000)("150 ggmasters")) return true;
          if (EMEI(15.0)(2250)("ggmasters $150")) return true;
          if (EMEI(15.0)(2250)("150 ggmasters")) return true;

          if (TEMEI(30.0)(20)("ggmasters $150")) return true;
          if (TEMEI(30.0)(20)("150 ggmasters")) return true;
          if (TEMEI(15.0)(15)("ggmasters $150")) return true;
          if (TEMEI(15.0)(15)("150 ggmasters")) return true;
        }
      } else if (network === "WNMX") {
        if (!t["@turbo"]) {
          if (EI(30.0)("seats to €250")) return true;
          if (EI(10.0)("seats to €50")) return true;
        }
      } else if (network === "WPN") {
        if (!t["@turbo"]) {
          if (EI(10.5)("sundaysqueeze") && EI(10.5)("freezeout [flight]")) return true;
          if (EI(22.0)("doubledeuce") && EI(22.0)("[flight]")) return true;
        }
      }
    }
  }

  return false;
}

module.exports = { filterLevelBySat };
