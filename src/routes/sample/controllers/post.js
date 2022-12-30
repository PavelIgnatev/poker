const { updateServer } = require("../../../modules/update/updateServer");
const { saveSample } = require("../../../utils/sample");

module.exports = async (req, res) => {
  const { sample } = req.body;

  try {
    await saveSample({ count: Number(sample) });
  } catch (error) {
    console.log("При обновлении сервера произошла ошибка", error);
  }

  return res.status(200).send();
};
