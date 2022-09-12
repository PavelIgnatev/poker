const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/state", controllers.getAbility2);

  done();
};
