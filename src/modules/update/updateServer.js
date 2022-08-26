const { updateFiltredTournaments } = require("../../modules/update/updateFiltredTournaments");
const { updateAbility1 } = require("../../modules/update/updateAbility1");
const { updateAbility2 } = require("../../modules/update/updateAbility2");
const { createdGap } = require("../../modules/created/createdGap");
const { saveCopyRules } = require("../../modules/save/saveCopyRules");
const { saveCopyConfig } = require("../../modules/save/saveCopyConfig");
const { collectionStatistics } = require("../../modules/collection/collectionStatistics");

const updateServer = async () => {
  console.log("Сервер запущен", new Date());
  console.log("Делаю запросы", new Date());
  await updateFiltredTournaments();
  console.log("Создаю объект промежутков");
  await createdGap();
  console.log("Объект промежутков созданн");
  console.log(`Начал обновление древовидного стейта по турнирам`);
  await updateAbility1();
  console.log(`Обновил древовидный стейт по турнирам`);
  console.log(`Начал обновление стейта по уровням`);
  await updateAbility2();
  console.log(`Завершил обновление стейта по уровням`);
  console.log(`Начал копировать rules.json`);
  await saveCopyRules();
  console.log(`Завершил копировать rules.json`);
  console.log(`Начал копировать config.json`);
  await saveCopyConfig();
  console.log(`Завершил копировать config.json`);
  console.log("Начал собирать статистику по турнирам игроков за определенный день");
  await collectionStatistics();
};

module.exports = { updateServer };
