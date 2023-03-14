const { getFiltredRules } = require("../../../utils/rules");

module.exports = async (req, res) => {
  const { level, network, status, KO } = req.query;
  const rules = await getFiltredRules(level, network, status, KO);

  res.status(200).send(rules);
};
