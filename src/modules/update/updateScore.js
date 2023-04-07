const { compress } = require("compress-json");
const { getIsoDate } = require("../../helpers/getIsoDate");
const { getScore } = require("../../helpers/getScore");
const { writeFile } = require("../../utils/promisify");


const updateScore = async () => {
  const score = await getScore()

  const date = getIsoDate()

  console.log("Начинаю записывать полученный score")
  try {
    await writeFile(`src/store/score/${date}.json`, JSON.stringify(compress(score)))
  }
  catch (e) {
    console.log("Не удалось записать полученный score")
  }

  console.log("Закончил записывать полученный score")
}

updateScore()


module.exports = { updateScore };