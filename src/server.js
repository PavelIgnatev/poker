const { PORT } = require("./config/");
const { createFastifyInstance } = require("./createFastifyInstance");
const { crons } = require("./modules/crons/crons");
const process = require('process')

process.env.TZ = "UTC";

const start = async () => {
  try {
    const fastify = await createFastifyInstance();

    if (!fastify) {
      console.error("Fastify не создался");
      return;
    }

    await fastify.listen({ port: PORT, host: "0.0.0.0" });

    global.app = fastify;

    fastify.log.info(`Сервер запущен ${new Date().toISOString()}`);
    crons();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start().catch();

process.on("unhandledRejection", (reason, promise) => {
  console.error({ reason, promise }, "серверный процесс unhandledRejection");
});
process.on("uncaughtException", (err) => {
  console.error({ err }, "серверный процесс uncaughtException");
});
