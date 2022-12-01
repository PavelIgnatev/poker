const { updateFiltredTournaments } = require("../../modules/update/updateFiltredTournaments");
const { updateAbility1 } = require("../../modules/update/updateAbility1");
const { updateAbility2 } = require("../../modules/update/updateAbility2");
const { updtateAllCopies } = require("./updateAllCopies");
const { collectionStatistics } = require("../collection/collectionStatistics");
const { saveRules, getRules } = require("../../utils/rules");
const { writeFile } = require("../../utils/promisify");
const { renderRules } = require("../../modules/render/renderRules");

const updateServer = async () => {
  console.log("Сервер запущен", new Date());

  const rules = await getRules();

  await saveRules(rules);

  await writeFile("src/modules/filter/filter.js", renderRules(rules));

  // Отправка писем
  try {
    console.log("Начинаю отправлять письма");
    await collectionStatistics();
  } catch (error) {
    console.log("Ошибка при отправке писем: ", error);
  }

  // Обновление сервака
  try {
    console.log(`Начал обновление фильтрованного стейта`);
    await updateFiltredTournaments();
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
};

module.exports = { updateServer };
