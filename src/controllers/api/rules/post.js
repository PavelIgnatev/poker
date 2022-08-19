const { getRules, saveRules } = require("../../../utils/rules");

module.exports = async (req, res) => {
  const { rules: bodyRules } = req.body;
  const rules = await getRules();

  rules.push(bodyRules);

  await saveRules(rules);

  res.status(200).send(rules);
};
