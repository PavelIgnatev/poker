const { getRules, saveRules } = require("../../../utils/rules");

module.exports = async (req, res) => {
  const { rule } = req.body;
  const rules = await getRules();

  rules.push(rule);

  await saveRules(rules);

  res.status(200).send(rule);
};
