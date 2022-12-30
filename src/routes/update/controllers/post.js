const { updateServer } = require("../../../modules/update/updateServer");

module.exports = async (req, res) => {
  try {
    updateServer();
  } catch (error) {
    console.log(error);
  }

  res.status(200).send({});
};
