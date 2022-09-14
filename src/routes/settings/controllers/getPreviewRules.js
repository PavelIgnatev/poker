const { getPreviewAbility2 } = require("../../../utils/rules");

module.exports = async (req, res) => {
  try {
    const settings = await getPreviewAbility2();

    res.send(settings);
  } catch (error) {
    console.log(error);
  }
};
