const { getOffpeak } = require("../../../utils/offpeak");

module.exports = async (req, res) => {
  const offpeak = await getOffpeak();

  res.status(200).send(offpeak);
};
