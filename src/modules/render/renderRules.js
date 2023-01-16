const { minifyFile } = require("../../helpers/minifyFile");
const { writeFile } = require("../../utils/promisify");
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

async function renderRules(rules) {
  const nativeRules = [...rules];
  customSort(nativeRules, ["green", "orange", "blue", "red", "brown", "black"]);
  const result = `const { getNetwork } = require("../../helpers/getNetwork");
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
    NotName: NotNameQ,
    Entrants: EntrantsQ,
    FLAGS: FLAGSQ,
  } = require("../../helpers/curry");
  const { isSuperTurbo: isSuperTurboS } = require("../../helpers/isSuperTurbo");
  const { isTurbo: isTurboS } = require("../../helpers/isTurbo");
  const { isNormal: isNormalS } = require("../../helpers/isNormal")
  const { isOffpeak: isOffpeakQ } = require("../../helpers/isOffpeak");
  
  const filter = (level, tournament, isGetTournaments = false) => {
    const name = tournament["@name"]?.toLowerCase(),
      network = getNetwork(tournament["@network"]),
      bid = Number(tournament["@usdBid"]),
      prizepool = Number(tournament["@usdPrizepool"]),
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
      NotName = NotNameQ(name),
      FLAGS = FLAGSQ(tournament),
      ability1 = tournament['@ability'],
      ability2 = tournament['@abilityBid'];

    const isTurbo = isTurboS(tournament);
    const isOffpeak = isOffpeakQ(tournament, Number(tournament['@realDuration'] ?? 0) * 1000);
    const isSuperTurbo = isSuperTurboS(tournament);
    const isKo = isNormalS(tournament);
    const isNormal = !isTurbo && !isSuperTurbo;
    const isAbility1 = ability1 && ability1 !== '-'
    const isAbility2 = ability2 && ability2 !== '-'
  
    if (!name || !bid) return { valid: false, guarantee: 1, rules: false };

    ${nativeRules
      .map((rule) => {
        if (rule[0].color === "orange") {
          return renderCheckFalse(rule.map(renderRule).join(" && "));
        }

        return renderCheck(rule, rule.map(renderRule).join(" && "));
      })
      .join("")}

    if(isGetTournaments && isAbility1 && isAbility2 && Number(ability1) <= Number(ability2)) return { valid: true, rules: false, guarantee: 1 } 
    
    return { valid: false, guarantee: 1, rules: false };
  };
  
  module.exports = {
    filter,
  };`;
  await writeFile("src/modules/filter/filter.js", result);
  await writeFile("client/src/modules/filter/filter.js", result);
}
module.exports = { renderRules };
