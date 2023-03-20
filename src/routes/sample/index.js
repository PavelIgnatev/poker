const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/email", controllers.get);
  fastify.post("/email", controllers.post);

  done();
};
