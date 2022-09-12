module.exports = {
  get: {
    querystring: {
      type: "object",
      properties: {
        level: { type: "string" },
      },
    },
    response: {
      200: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
};
