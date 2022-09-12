const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/rules", controllers.get);
  fastify.post("/rules", controllers.post);
  fastify.patch("/rules", controllers.patch);
  fastify.delete("/rules", controllers.delete);

  done();
};
