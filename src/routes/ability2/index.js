const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/store/ability2", controllers.get);
  done();
};
