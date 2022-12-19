const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/store/currency", controllers.get);
  done();
};
