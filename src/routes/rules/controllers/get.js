const { getFiltredRules } = require("../../../utils/rules");

module.exports = async (req, res) => {
  const { color, level, network, status, KO } = req.query;

  const rules = await getFiltredRules(color, level, network, status, KO);

  res.status(200).send(rules);
};
