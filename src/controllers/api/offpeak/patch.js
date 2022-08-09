const { saveOffpeak } = require("../../../utils/offpeak");

module.exports = async (req, res) => {
  const { offpeak } = req.body;

  await saveOffpeak(offpeak);

  res.status(200).send();
};
