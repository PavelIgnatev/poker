const fs = require("fs");

module.exports = {
  fastifySendFile: (reply, type, path) => {
    const file = fs.readFileSync(path);
    reply.type(type).send(file);
  },
};
