const ping = (fastify, _, done) => {
  fastify.get("/ping", { schema }, () => "pong");

  done();
};

const schema = {
  response: {
    200: {
      type: "string",
      pattern: "^pong$",
    },
  },
};

module.exports = ping;
