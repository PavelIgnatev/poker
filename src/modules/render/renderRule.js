const config = require("../../store/rules/confgi.json");

function renderRule(rule) {
  const { type, values, offpeak, network, level, KO, status } = rule;
  const indexPrizepool = config[type].findIndex((rule) => rule.placeholder === "Guarantee");
  values[indexPrizepool] = offpeak
    ? `isOffpeak ? 0 : ${values[indexPrizepool]}`
    : values[indexPrizepool];

  return `(${type}(${values
    .map((value, i) => (typeof value === "string" && indexPrizepool !== i ? `"${value}"` : value))
    .join(",")}))
    && network === '${network}'
    && level === '${level}'
    && is${status}
    && ${KO ? "isKo" : "!isKo"}`;
}

module.exports = { renderRule };
