const { getRules, saveRules } = require("../../../utils/rules");
const { renderRules } = require("../../../modules/render/renderRules");
const { findInArray } = require("../../../helpers/findInArray");

module.exports = async (req, res) => {
  const { rules: bodyRules, offpeak } = req.body;
  const rules = await getRules();
  const index = findInArray(rules, bodyRules);

  if (index === -1) {
    return res.status(400).send({ message: "Rule not found" });
  }

  rules[index].map((rule) => (rule.offpeak = offpeak));

  await saveRules(rules);
  await renderRules(rules);

  res.status(200).send(rules);
};
