const { getStopWords } = require("../../../utils/stopWords");


module.exports = async (req, res) => {
  const stopWords = await getStopWords()

  res.status(200).send(stopWords);
};
