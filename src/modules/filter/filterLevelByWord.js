const { I: i } = require("../../helpers/curry.js");

/**
 * Возвращае true, если турнир прошел фильтрацию по правилам слов
 * @param {string} network Network
 * @param {string} name Name
 * @return {boolean} True, если турнир прошел фильтрацию по правилам слов
 */

const filterLevelByWord = (network, name) => {
  const I = i(name);

  if (network === "PS.eu") {
    if (
      I("hyper") ||
      I("short: 15bb") ||
      (I("sat") && !I("saturday")) ||
      I("on demand")
    )
      return true;
  } else if (network === "GG") {
    if (
      I("seat") ||
      I("hyper") ||
      I("step") ||
      I("no fee") ||
      I("flip & go") ||
      I("all-in") ||
      I("speed racer") ||
      I("battle royale") ||
      I("t$ builder") ||
      I("sit & go") ||
      I("aof") ||
      (I("sat") && !I("saturday"))
    )
      return true;
  } else if (network === "PS.es") {
    if (
      I("hyper") ||
      I("reserved for .fr players only") ||
      I("r&a") ||
      (I("sat") && !I("saturday"))
    )
      return true;
  } else if (network === "Party") {
    if (I("hyper") || I("ultrasonic") || (I("sat") && !I("saturday")))
      return true;
  } else if (network === "888") {
    if (I("snap") || (I("sat") && !I("saturday"))) return true;
  } else if (network === "WPN") {
    if (
      I("valueticket") ||
      (I("sat") && !I("saturday")) ||
      I("beast & snc") ||
      I("hyper") ||
      I("home game") ||
      I("apc online game") ||
      I("seats") ||
      I("homegame")
    )
      return true;
  } else if (network === "WNMX") {
    if (
      I("hit&run") ||
      (I("sat") && !I("saturday")) ||
      I("qualif.") ||
      I("last chance")
    )
      return true;
  } else if (network === "IP") {
    if (I("sat ") || I("satellite ") || I("ticket ")) return true;
  }
  return false;
};

module.exports = { filterLevelByWord };
