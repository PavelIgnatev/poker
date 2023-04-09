const { updateServer } = require("../../../modules/update/updateServer");
const { saveStopWords } = require("../../../utils/stopWords");

module.exports = async (req, res) => {
  const { stopWords } = req.body;

  try {
    await saveStopWords(stopWords);
  } catch (error) {
    console.log("При обновлении сервера произошла ошибка", error);
  }

  return res.status(200).send();
};
