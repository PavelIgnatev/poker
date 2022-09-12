const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/settings", controllers.getPreviewRules);
  fastify.post("/settings", controllers.postSettings);

  done();
};
