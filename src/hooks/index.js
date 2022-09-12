const path = require("path");

const fastifyHelmet = require("@fastify/helmet");
const fastifyRateLimit = require("@fastify/rate-limit");
const fastifySwagger = require("@fastify/swagger");
const fastifyHttpProxy = require("@fastify/http-proxy");
const fastifyStatic = require("@fastify/static");

const { isProduction } = require("../config");
const { fastifySendFile } = require("../helpers/fastifySendFile");

module.exports = {
  useHooks: async (fastify) => {
    // цепляется на хук onRequest, можно заиспользовать вторым параметром при регистрации роута либо в reply.helmet();
    // так же можно отменить вторым параметром при регистрации роута
    await fastify.register(fastifyHelmet, { hidePoweredBy: true });

    // хук onRequest
    await fastify.register(fastifyRateLimit, { max: 60, timeWindow: "1 minute" });

    if (!isProduction) {
      await fastify.register(fastifyHttpProxy, {
        upstream: "http://localhost:3001",
      });

      await fastify.register(fastifySwagger, {
        routePrefix: "/swagger",
        exposeRoute: true,
        swagger: {
          info: {
            title: "Poker swagger",
            version: "1.1.0",
          },
        },
      });
    }

    if (isProduction) {
      /** посмотри вот эту хуйню

      await fastify.register(fastifyStatic, { root: path.resolve(__dirname, "../../client/build") });

      fastify.get("*", (req, reply) => {
        // reply.sendFile - такого нет, но есть пакет,
        // который его привносит
        fastifySendFile(
          reply,
          "text/html",
          path.resolve(__dirname, "../../client/build/index.html"),
        );
      });

      **/
    }

    fastify.log.info("Хуки подключены");
  },
};
