const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/tour", controllers.getTournaments);

  done();
};
