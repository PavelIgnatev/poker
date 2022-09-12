const fs = require("fs");

module.exports = {
  fastifySendFile: (reply, type, path) => {
    const stream = fs.createReadStream(path);

    reply.type(type).send(stream);
  },
};
