const { PORT, isProduction } = require("./config");
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
  } catch (err) {
    console.log(err);

    if (isProduction) {
      // здесь перезапуск сервера лучше сделать (либо ловить свыше, что сервер упал с таким-то кодом, и перезапускать)
      process.exit(1);
    }
  }
};
start().catch();

// const express = require("express");
// const CronJob = require("cron").CronJob;
//
// const setupMiddlewares = require("./middlewares");
// const { apiRouter, mainRouter } = require("./routers");
// const app = express();
// const { updateServer } = require("./modules/update/updateServer");
//
// // setup other
// setupMiddlewares(app);
//
// // api routes
// app.use("/api", apiRouter);
//
// // main routes
// app.use("/", mainRouter);
//
// const job = new CronJob(
//   "0 0 * * *",
//   async function () {
//     try {
//       await updateServer();
//     } catch (error) {
//       console.log("При обновлении сервера произошла ошибка", error);
//     }
//   },
//   null,
//   true,
//   "America/New_York",
// );
// job.start();
