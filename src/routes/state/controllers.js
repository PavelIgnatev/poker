const { fastifySendFile } = require("../../helpers/fastifySendFile");

const getAbility2 = async (req, res) => {
  fastifySendFile(res, "json", "src/store/ability2/ability2.json");
};

module.exports = { getAbility2 };
