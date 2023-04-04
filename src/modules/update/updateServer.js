const { updateAbility1 } = require("../../modules/update/updateAbility1");
const { updtateAllCopies } = require("./updateAllCopies");
const { collectionStatistics } = require("../collection/collectionStatistics");
const { getRules } = require("../../utils/rules");
const { renderRules } = require("../../modules/render/renderRules");
const { updateTournaments } = require("./updateTournaments");

const updateServer = async () => {
  console.log('Начинаю обновлять сервер', new Date())
  try {
    const rules = await getRules();
    await renderRules(rules);
  } catch (erorr) {
    console.log("Ошибка при рендере правил: ", erorr);
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

    console.log(`Начал обновление древовидного стейта по турнирам`);
    await updateAbility1();
    console.log(`Обновил древовидный стейт по турнирам`);
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
