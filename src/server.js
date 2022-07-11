const express = require("express");
const CronJob = require("cron").CronJob;

const { PORT } = require("./config");
const {
  updateFiltredTournaments,
} = require("./modules/update/updateFiltredTournaments");
const setupMiddlewares = require("./middlewares");
const { apiRouter, mainRouter } = require("./routers");
const { updateAbility1 } = require("./modules/update/updateAbility1");
const { updateAbility2 } = require("./modules/update/updateAbility2");
const app = express();
const { createdGap } = require("./modules/created/createdGap");
const { saveCopyRules } = require("./modules/save/saveCopyRules");
const { saveCopyAlias } = require("./modules/save/saveCopyAlias");
const {
  collectionStatistics,
} = require("./modules/collection/collectionStatistics");
const { writeFile, readFile } = require("./utils/promisify");
const {
  filterLevelByAbility,
} = require("./modules/filter/filterLevelByAbility");
const { sendStatistics } = require("./modules/send/sendStatistics");

// setup other
setupMiddlewares(app);

// api routes
app.use("/api", apiRouter);

// main routes
app.use("/", mainRouter);

const run = async () => {
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
  console.log(`Начал копировать alias.json`);
  await saveCopyAlias();
  console.log(`Завершил копировать alias.json`);
  console.log("Начал собирать статистику по турнирам игроков");
  await collectionStatistics();
};

app.listen(process.env.PORT || PORT, async () => {
  console.log("Сервер запущен", new Date());
  // const prevErrorTournaments = JSON.parse(
  //   await readFile(`src/store/errors/errorTournaments.json`)
  // );
  // sendStatistics(prevErrorTournaments);
  run()   
});

const job = new CronJob(
  "0 0 * * *",
  function () {
    run();
  },
  null,
  true,
  "Europe/Moscow"
);
job.start();
