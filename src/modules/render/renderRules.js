const { renderCheck } = require("./renderCheck");
const { renderRule } = require("./renderRule");

function renderRules(rules) {
  return rules
    .map((rule) => {
      const isArray = Array.isArray(rule);

      if (isArray) {
        return renderCheck(rule.map(renderRule).join(" && "));
      }

      return renderCheck(renderRule(rule));
    })
    .join("");
}
module.exports = { renderRules };
