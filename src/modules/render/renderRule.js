const fs = require("fs");
const { timeStringToMilliseconds } = require("../../helpers/timeStringToMilliseconds");

const validateNumber = (value) => {
  return value
    .replace(/[^\d.]*/g, "")
    .replace(/([.])[.]+/g, "$1")
    .replace(/^[^\d]*(\d+([.]\d{0,5})?).*$/g, "$1");
};

function renderRule(rule) {
  const { type, values, network, level: ruleLevel, KO, status } = rule;
  const config = JSON.parse(fs.readFileSync("src/store/rules/config.json", "utf-8"));

  const indexPrizepool = config[type].findIndex((rule) => rule.placeholder === "Guarantee");

  const level = validateNumber(ruleLevel);
  const effMu = ruleLevel.replace(level, "").replace("-", "");

  return (
    `(${type}(${values
      .map((value, i) => {
          if(config[type][i].type === 'time') {
            return timeStringToMilliseconds(value)
          } 

          return config[type][i].type === "string" && indexPrizepool !== i
            ? `"${value}"`
            : indexPrizepool !== i
            ? Number(value)
            : value
        }
      )
      .join(",")}))` +
    (network !== "all" ? `&& network === '${network}'` : "") +
    (level === "1" && ruleLevel.includes("-") ? "" : `&& level === '${level}'`) +
    (effMu !== "all" ? `&& effmu === '${effMu}'` : "") +
    (status !== "all" ? `&& is${status}` : "") +
    (KO !== "all" ? `&& ${KO === "Knockout" ? "isKo" : "!isKo"}` : "")
  );
}

module.exports = { renderRule };
