const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/update", controllers.get);
  fastify.post("/update", controllers.post);
  done();
};
