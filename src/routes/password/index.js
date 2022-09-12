const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.post("/password/admin", controllers.postAdminPassword);

  done();
};
