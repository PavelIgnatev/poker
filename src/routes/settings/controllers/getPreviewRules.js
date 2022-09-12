const { getPreviewAbility2 } = require("../../../utils/rules");

module.exports = async (req, res) => {
  try {
    const settings = await getPreviewAbility2();

    res.json(settings);
  } catch (error) {
    console.log(error);
  }
};
