const { filterRules } = require("../../../helpers/filterRules");
const { getRules, saveRules } = require("../../../utils/rules");

module.exports = async (req, res) => {
  const data = req.body;
  console.log(data);
  const { color, level, network, status, KO, type, values } = data[0];
  console.log(color, level, network, status, KO, type, values);

  const rules = await getRules();
  const filtredTournaments = rules.filter(
    (rule) => !filterRules(rule[0], color, level, network, status, KO, type, values),
  );
  await saveRules(filtredTournaments);

  res.status(200).send(filtredTournaments);
};
