const { getRules, saveRules } = require("../../../utils/rules");
const { renderRules } = require("../../../modules/render/renderRules");
const { findInArray } = require("../../../helpers/findInArray");

module.exports = async (req, res) => {
  const { rules: bodyRules } = req.body;
  const rules = await getRules();
  const index = findInArray(rules, bodyRules);

  if (index === -1) {
    return res.status(400).send({ message: "Rule not found" });
  }

  await saveRules(rules);
  await renderRules(rules);

  res.status(200).send(rules);
};
