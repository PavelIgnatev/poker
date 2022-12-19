const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/store/rulesAbility2", controllers.get);
  done();
};
