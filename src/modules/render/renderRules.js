const { renderCheck } = require("./renderCheck");
const { renderCheckFalse } = require("./renderCheckFalse");
const { renderRule } = require("./renderRule");

function customSort(a, s) {
  return a.sort(function (x1, x2) {
    var i1 = s.indexOf(x1[0].color),
      i2 = s.indexOf(x2[0].color);
    return i1 < 0 ? 1 : i2 < 0 ? -1 : i1 - i2;
  });
}

function renderRules(rules) {
  customSort(rules, ["orange", "blue", "red", "brown", "black", "green"]);
  return `const { getNetwork } = require("../../helpers/getNetwork");
  const {
    FromTo: FromToQ,
    FromToName: FromToNameQ,
    BidGt: BidGtQ,
    BidGtName: BidGtNameQ,
    Ticket: TicketQ,
    BidName: BidNameQ,
    Name: NameQ,
    FromToGt: FromToGtQ,
    StartDay: StartDayQ,
    Entrants: EntrantsQ,
    FLAGS: FLAGSQ,
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
      bid = Number(tournament["@bid"]),
      prizepool = Number(tournament["@prizepool"]),
      weekDay = tournament["@getWeekday"],

      FromTo = FromToQ(bid),
      FromToName = FromToNameQ(name)(bid),
      BidGt = BidGtQ(bid)(prizepool),
      BidGtName = BidGtNameQ(name)(bid)(prizepool),
      FromToGt = FromToGtQ(bid)(prizepool),
      Ticket = TicketQ(name)(bid)(tournament["@tickets"] ?? 0),
      Entrants = EntrantsQ(tournament?.["@totalEntrants"] ?? 0),
      BidName = BidNameQ(name)(bid),
      StartDay = StartDayQ(weekDay),
      Name = NameQ(name),
      FLAGS = FLAGSQ(tournament);
  
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
        if (rule[0].color === "orange") {
          return renderCheckFalse(rule.map(renderRule).join(" && "));
        }

        return renderCheck(rule.map(renderRule).join(" && "));
      })
      .join("")}
    
    return false;
  };
  
  module.exports = {
    filterLevelByRules,
  };`;
}
module.exports = { renderRules };
