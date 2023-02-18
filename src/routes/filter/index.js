const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/filter", controllers.get);

  done();
};
