const { getSample } = require("../../../utils/sample");

module.exports = async (req, res) => {
  const sample = await getSample();

  res.status(200).send(sample);
};
