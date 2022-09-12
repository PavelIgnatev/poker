const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/info", controllers.getFormingAbility2);

  done();
};
