const { updateServer } = require("../../../modules/update/updateServer");
const { saveSample } = require("../../../utils/sample");

module.exports = async (req, res) => {
  const { sample } = req.body;

  await saveSample({ count: Number(sample) });

  updateServer();

  res.status(200).send();
};
