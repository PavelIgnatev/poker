const controllers = require("./controllers");
const schemas = require("./schemas");

module.exports = (fastify, opts, done) => {
  fastify.get("/aliases", { schema: schemas.get }, controllers.get);

  done();
};
