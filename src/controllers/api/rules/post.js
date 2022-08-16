const { getRules } = require("../../../utils/rules");

module.exports = async (req, res) => {
  const sample = await getRules();

  res.status(200).send(sample);
};
