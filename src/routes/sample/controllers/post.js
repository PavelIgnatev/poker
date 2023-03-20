const { saveEmail } = require("../../../utils/email");

module.exports = async (req, res) => {
  const { email } = req.body;

  try {
    await saveEmail({ email });
  } catch (error) {
    console.log("При обновлении сервера произошла ошибка", error);
  }

  return res.status(200).send();
};
