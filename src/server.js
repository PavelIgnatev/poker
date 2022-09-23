const { PORT } = require("./config/");
const CronJob = require("cron").CronJob;
const { createFastifyInstance } = require("./createFastifyInstance");
const { updatePartServer } = require("./modules/update/updatePartServer");

const start = async () => {
  try {
    const fastify = await createFastifyInstance();

    if (!fastify) {
      console.error("Fastify не создался");
      return;
    }

    await fastify.listen({ port: PORT });

    fastify.log.info(`Сервер запущен ${new Date().toISOString()}`);

    updatePartServer();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start().catch();

process.on("unhandledRejection", (reason, promise) => {
  log.error({ reason, promise }, "серверный процесс unhandledRejection");
});
process.on("uncaughtException", (err) => {
  log.error({ err }, "серверный процесс uncaughtException");
});

const job = new CronJob("0 0 * * *", function () {
  updatePartServer();
});
job.start();
