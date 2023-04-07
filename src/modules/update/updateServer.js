const { updtateAllCopies } = require("./updateAllCopies");
const { collectionStatistics } = require("../collection/collectionStatistics");
const { getRules } = require("../../utils/rules");
const { writeFile, readFile } = require("../../utils/promisify");
const { renderRules } = require("../../modules/render/renderRules");
const { updateTournaments } = require("./updateTournaments");
const { updateScore } = require("./updateScore");

const updateUrl = "src/store/update/update.json";

const updateServer = async () => {
  const { isUpdated } = JSON.parse(await readFile(updateUrl));

  if (isUpdated) {
    console.log("Сервер уже обновляется");
    return;
  }

  try {
    await writeFile(updateUrl, JSON.stringify({ isUpdated: true, timestamp: Date.now() }));
  } catch (error) {
    console.log("Ошибка обновлении статуса обновления сервера: ", error);
  }

  try {
    const rules = await getRules();
    await renderRules(rules);
  } catch (erorr) {
    console.log("Ошибка при рендере правил: ", error);
  }

  // Отправка писем
  try {
    console.log("Начинаю отправлять письма");
    await collectionStatistics();
  } catch (error) {
    console.log("Ошибка при отправке писем: ", error);
  }

  // Обновление сервака
  try {
    console.log(`Начал обновление папки дней`);
    await updateTournaments();
    console.log(`Завершил обновление фильтрованного стейта`);


  } catch (error) {
    console.log("Ошибка при обновлении сервера: ", error);
  }

  // Обновление данных для писем на конркетный день
  try {
    await updtateAllCopies();
  } catch (error) {
    console.log("Ошибка при сохранении всех копий: ", error);
  }

  // Обновление данных для папки Score
  try {
    await updateScore()
  } catch (error) {
    console.log("Ошибка при сохранении score")
  }

  await writeFile(updateUrl, JSON.stringify({ isUpdated: false }));
};

module.exports = { updateServer };
