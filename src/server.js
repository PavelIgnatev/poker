const { PORT, isProduction } = require("./config");
const CronJob = require("cron").CronJob;
const { createFastifyInstance } = require("./createFastifyInstance");

const start = async () => {
  try {
    const fastify = await createFastifyInstance();

    if (!fastify) {
      console.error("Fastify не создался");
      return;
    }

    await fastify.listen({ port: PORT });

    fastify.log.info(`Сервер запущен ${new Date().toISOString()}`);

    try {
      fastify.log.info(`Начинаю отправлять письма`);
      await collectionStatistics();
    } catch (error) {
      fastify.log.info("Ошибка при отправке писем: ", error);
    }

    // Обновление копий
    try {
      await updtateAllCopies();
    } catch (error) {
      fastify.log.info("Ошибка при сохранении всех копий: ", error);
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
  try {
    await updateServer();
  } catch (error) {
    console.log("При обновлении сервера произошла ошибка", error);
  }
});
job.start();
