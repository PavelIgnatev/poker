const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/stopwords", controllers.get);
  fastify.post("/stopwords", controllers.post);

  done();
};