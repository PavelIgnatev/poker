const { updateAbility1 } = require("../../modules/update/updateAbility1");
const { updateAbility2 } = require("../../modules/update/updateAbility2");
const { updtateAllCopies } = require("./updateAllCopies");
const { collectionStatistics } = require("../collection/collectionStatistics");
const { getRules } = require("../../utils/rules");
const { writeFile, readFile } = require("../../utils/promisify");
const { renderRules } = require("../../modules/render/renderRules");
const { updateTournaments } = require("./updateTournaments");

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
    // await collectionStatistics();
  } catch (error) {
    console.log("Ошибка при отправке писем: ", error);
  }

  // Обновление сервака
  try {
    console.log(`Начал обновление папки дней`);
    await updateTournaments();
    console.log(`Завершил обновление фильтрованного стейта`);

    console.log(`Начал обновление древовидного стейта по турнирам`);
    await updateAbility1();
    console.log(`Обновил древовидный стейт по турнирам`);

    console.log(`Начал обновление стейта по уровням`);
    await updateAbility2();
    console.log(`Завершил обновление стейта по уровням`);
  } catch (error) {
    console.log("Ошибка при обновлении сервера: ", error);
  }

  // Обновление данных для писем на конркетный день
  try {
    await updtateAllCopies();
  } catch (error) {
    console.log("Ошибка при сохранении всех копий: ", error);
  }

  await writeFile(updateUrl, JSON.stringify({ isUpdated: false }));
};

module.exports = { updateServer };
