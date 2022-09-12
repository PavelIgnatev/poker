const { updateFiltredTournaments } = require("../../modules/update/updateFiltredTournaments");
const { updateAbility1 } = require("../../modules/update/updateAbility1");
const { updateAbility2 } = require("../../modules/update/updateAbility2");
const { createdGap } = require("../../modules/created/createdGap");
const { saveCopyRules } = require("../../modules/save/saveCopyRules");
const { saveCopyConfig } = require("../../modules/save/saveCopyConfig");
const { collectionStatistics } = require("../../modules/collection/collectionStatistics");

const updateServer = () => {
  console.log("Сервер запущен", new Date());
  console.log("Делаю запросы", new Date());
  return updateFiltredTournaments()
    .then(() => {
      console.log("Начал собирать статистику по турнирам игроков за определенный день");
      return collectionStatistics();
    })
    .then(() => {
      console.log("Создаю объект промежутков");
      return createdGap();
    })
    .then(() => {
      console.log("Объект промежутков создан");
      console.log(`Начал обновление древовидного стейта по турнирам`);
      return updateAbility1();
    })
    .then(() => {
      console.log(`Обновил древовидный стейт по турнирам`);
      console.log(`Начал обновление стейта по уровням`);
      return updateAbility2();
    })
    .then(() => {
      console.log(`Завершил обновление стейта по уровням`);
      console.log(`Начал копировать rules.json`);
      return saveCopyRules();
    })
    .then(() => {
      console.log(`Завершил копировать rules.json`);
      console.log(`Начал копировать config.json`);
      return saveCopyConfig();
    })
    .then(() => {
      console.log(`Завершил копировать config.json`);
    })
    .catch((error) => console.log("Ошибка при обновлении сервера: ", error));
};

module.exports = { updateServer };
