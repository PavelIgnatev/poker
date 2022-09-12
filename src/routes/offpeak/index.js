const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/offpeak", controllers.get);
  fastify.post("/offpeak", controllers.post);

  done();
};
