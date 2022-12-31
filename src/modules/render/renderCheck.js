const fs = require("fs");

function renderCheck(rules, ruleString) {
  let maxGuarantee = 0;

  rules.map((rule) => {
    const { type, values } = rule;

    const config = JSON.parse(fs.readFileSync("src/store/rules/config.json", "utf-8"));

    const indexPrizepool = config[type].findIndex((rule) => rule.placeholder === "Guarantee");

    maxGuarantee = Math.max(maxGuarantee, Number(values?.[indexPrizepool]?.replace('isOffpeak && isGetTournaments ? 0 : ', '') ?? 0));
  });

  return `if(${ruleString}) return { valid: true, rules: true, guarantee: ${maxGuarantee} };`;
}

module.exports = { renderCheck };
