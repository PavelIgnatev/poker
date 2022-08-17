const { filterRules } = require("../../../helpers/filterRules");
const { getRules, saveRules } = require("../../../utils/rules");

module.exports = async (req, res) => {
  const {
    rule: { color, level, network, status, KO },
  } = req.body;
  const rules = await getRules();
  const filtredTournaments = rules.filter(
    (rule) => !filterRules(Array.isArray(rule) ? rule[0] : rule, color, level, network, status, KO),
  );
  await saveRules(filtredTournaments);

  res.status(200).send(filtredTournaments);
};
