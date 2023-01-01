const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/full-update", controllers.post);
  done();
};
