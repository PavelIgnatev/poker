const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/config", controllers.get);
  fastify.post("/config", controllers.post);
  fastify.patch("/config", controllers.patch);
  fastify.delete("/config", controllers.delete);

  done();
};
