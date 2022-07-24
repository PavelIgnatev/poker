const { run } = require("../../../server");
const { saveSample } = require("../../../utils/sample");

module.exports = async (req, res) => {
  const { sample } = req.body;

  await saveSample({ count: Number(sample) });

  // вызывать run

  res.status(200).send();
};
