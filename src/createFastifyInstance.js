const fastifyCreator = require("fastify");
const fastifyAutoload = require("@fastify/autoload");

const path = require("path");

const { isProduction } = require("./config");
const { useHooks } = require("./hooks");

module.exports = {
  createFastifyInstance: async () => {
    const fastify = fastifyCreator({
      logger: {
        transport: isProduction
          ? undefined
          : {
              target: "pino-pretty",
              options: {
                ignore: "pid,hostname",
              },
            },
      },
      ajv: {
        customOptions: {
          removeAdditional: false,
          useDefaults: true,
          coerceTypes: true,
          allErrors: true,
          strictTypes: true,
          strictRequired: true,
        },
        plugins: [],
      },
      bodyLimit: 104857600
    });

    // подключаем хуки
    await useHooks(fastify);

    // подключаем роуты
    await fastify.register(fastifyAutoload, {
      dir: path.join(__dirname, "routes"),
      dirNameRoutePrefix: false,
      options: { prefix: "/api/" },
    });
    fastify.log.info("Ручки подключены");

    return fastify;
  },
};
