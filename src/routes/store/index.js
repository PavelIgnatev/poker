const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/store", controllers.get);
  fastify.post("/store", controllers.post);

  done();
};
