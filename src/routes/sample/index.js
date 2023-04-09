const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/sample", controllers.get);
  fastify.post("/sample", controllers.post);

  done();
};