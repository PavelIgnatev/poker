const controllers = require("./controllers");

module.exports = (fastify, opts, done) => {
  fastify.get("/store/ability1", controllers.get);
  done();
};
