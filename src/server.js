const { PORT, isProduction } = require("./config/");
const CronJob = require("cron").CronJob;
const { updtateAllCopies } = require("./modules/update/updateAllCopies");
const { collectionStatistics } = require("./modules/collection/collectionStatistics");
const { createFastifyInstance } = require("./createFastifyInstance");
const { updateFiltredTournaments } = require("./modules/update/updateFiltredTournaments");

const start = async () => {
  try {
    const fastify = await createFastifyInstance();

    if (!fastify) {
      console.error("Fastify не создался");
      return;
    }

    await fastify.listen({ port: PORT });

    fastify.log.info(`Сервер запущен ${new Date().toISOString()}`);

    // Добавление нового дня
    try {
      console.log(`Начал обновление фильтрованного стейта`);
      await updateFiltredTournaments();
    } catch (error) {
      console.log("Ошибка при добавлении нового дня на сервер: ", error);
    }

    // Отправка писем
    try {
      console.log("Начинаю отправлять письма");
      await collectionStatistics();
    } catch (error) {
      console.log("Ошибка при отправке писем: ", error);
    }

    // Обновление копий
    try {
      await updtateAllCopies();
    } catch (error) {
      console.log("Ошибка при сохранении всех копий: ", error);
    }
  } catch (err) {
    console.log(err);

    if (isProduction) {
      // здесь перезапуск сервера лучше сделать (либо ловить свыше, что сервер упал с таким-то кодом, и перезапускать)
      process.exit(1);
    }
  }
};
start().catch();

const job = new CronJob("0 0 * * *", async function () {
  // Добавление нового дня
  try {
    console.log(`Начал обновление фильтрованного стейта`);
    await updateFiltredTournaments();
  } catch (error) {
    console.log("Ошибка при добавлении нового дня на сервер: ", error);
  }

  // Отправка писем
  try {
    console.log("Начинаю отправлять письма");
    await collectionStatistics();
  } catch (error) {
    console.log("Ошибка при отправке писем: ", error);
  }

  // Обновление копий
  try {
    await updtateAllCopies();
  } catch (error) {
    console.log("Ошибка при сохранении всех копий: ", error);
  }
});
job.start();
