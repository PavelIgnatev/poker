const { writeFile } = require("../../utils/promisify");
const { renderCheck } = require("./renderCheck");
const { renderCheckFalse } = require("./renderCheckFalse");
const { renderRule } = require("./renderRule");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

function customSort(a, s) {
  return a.sort(function (x1, x2) {
    var i1 = s.indexOf(x1[0].color),
      i2 = s.indexOf(x2[0].color);
    return i1 < 0 ? 1 : i2 < 0 ? -1 : i1 - i2;
  });
}

async function renderRules(rules) {
  const nativeRules = [...rules];
  customSort(nativeRules, ["green", "orange", "blue"]);
  const result = `const { getNetwork } = require("../../helpers/getNetwork");
  const {
    BidEqual: BidEqualQ,
    BidFrom: BidFromQ,
    BidTo: BidToQ,
    PrizepoolEqual: PrizepoolEqualQ,
    PrizepoolFrom: PrizepoolFromQ,
    PrizepoolTo: PrizepoolToQ,
    EntrantsEqual: EntrantsEqualQ,
    EntrantsFrom: EntrantsFromQ,
    EntrantsTo: EntrantsToQ,
    AbilityEqual: AbilityEqualQ,
    AbilityFrom: AbilityFromQ,
    AbilityTo: AbilityToQ,
    StartRegEqual: StartRegEqualQ,
    StartRegFrom: StartRegFromQ,
    StartRegTo: StartRegToQ,
    LateRegEqual: LateRegEqualQ,
    LateRegFrom: LateRegFromQ,
    LateRegTo: LateRegToQ,
    TicketEqual: TicketEqualQ,
    TicketFrom: TicketFromQ,
    TicketTo: TicketToQ,
    Name: NameQ,
    NotName: NotNameQ,
    StartDay: StartDayQ,
    Flags: FlagsQ,
    Class: ClassQ,
    Structure: StructureQ,
    Game: GameQ,
  } = require("../../helpers/curry");
  const { isSuperTurbo: isSuperTurboS } = require("../../helpers/isSuperTurbo");
  const { isTurbo: isTurboS } = require("../../helpers/isTurbo");
  const { isNormal: isNormalS } = require("../../helpers/isNormal")
  const {validateNumber} = require('../../helpers/validateNumber')
  
  const filter = (ruleLevel, tournament, isGetTournaments = false) => {
    const ability = !tournament['@ability'] || tournament['@ability'] === '-' ? 0 : tournament['@ability']

    const name = tournament["@name"]?.toLowerCase(),
      network = getNetwork(tournament["@network"]),
      bid = Number(tournament["@usdBid"]),
      prizepool = Math.round(Number(tournament["@usdPrizepool"])),
      weekDay = tournament["@getWeekday"],

      BidEqual = BidEqualQ(bid),
      BidFrom = BidFromQ(bid),
      BidTo = BidToQ(bid),
      PrizepoolEqual = PrizepoolEqualQ(prizepool),
      PrizepoolFrom = PrizepoolFromQ(prizepool),
      PrizepoolTo = PrizepoolToQ(prizepool),
      EntrantsEqual = EntrantsEqualQ(tournament?.["@totalEntrants"] ?? 0),
      EntrantsFrom = EntrantsFromQ(tournament?.["@totalEntrants"] ?? 0),
      EntrantsTo = EntrantsToQ(tournament?.["@totalEntrants"] ?? 0),
      AbilityEqual = AbilityEqualQ(ability),
      AbilityFrom = AbilityFromQ(ability),
      AbilityTo = AbilityToQ(ability),
      StartRegEqual = StartRegEqualQ(tournament["@msStartForRule"]),
      StartRegFrom = StartRegFromQ(tournament["@msStartForRule"]),
      StartRegTo = StartRegToQ(tournament["@msStartForRule"]),
      LateRegEqual = LateRegEqualQ(tournament["@msLateForRule"]),
      LateRegFrom = LateRegFromQ(tournament["@msLateForRule"]),
      LateRegTo = LateRegToQ(tournament["@msLateForRule"]),
      TicketEqual = TicketEqualQ(tournament?.["@tickets"] ?? 0),
      TicketFrom = TicketFromQ(tournament?.["@tickets"] ?? 0),
      TicketTo = TicketToQ(tournament?.["@tickets"] ?? 0),
      StartDay = StartDayQ(weekDay),
      Name = NameQ(name),
      NotName = NotNameQ(name),
      Flags = FlagsQ(tournament),
      Class = ClassQ(tournament),
      Structure = StructureQ(tournament),
      Game = GameQ(tournament);
    const isTurbo = isTurboS(tournament);
    const isSuperTurbo = isSuperTurboS(tournament);
    const isKo = isNormalS(tournament);
    const isNormal = !isTurbo && !isSuperTurbo;

    const level = validateNumber(ruleLevel);
    const effmu = 'A'
  
    if (!name || !bid) {
      return { valid: false, guarantee: 1, rules: false };
    };\n

    ${nativeRules
      .map((rule) => {
        if (rule[0].color === "orange") {
          return renderCheckFalse(rule.map(renderRule).join(" && "));
        }

        return renderCheck(rule, rule.map(renderRule).join(" && "));
      })
      .join("")}
    
    return { valid: false, guarantee: 1, rules: false };
  };
  
  module.exports = {
    filter,
  };`;
  await writeFile("src/modules/filter/filter.js", result);
  await exec("rollup --config rollup.config.mjs --bundleConfigAsCjs");
}
module.exports = { renderRules };
