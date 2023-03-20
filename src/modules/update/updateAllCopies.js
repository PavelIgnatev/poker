const { getAbility } = require("../../utils/ability");
const { getConfig } = require("../../utils/config");
const { updateCopies } = require("./updateCopies");

const updtateAllCopies = async () => {
  try {
    const config = await getConfig();
    const ability1 = await getAbility();

    console.log(`Начал копировать config.json`);
    await updateCopies(config, "config.json");
    console.log(`Завершил копировать config.json`);

    console.log(`Начал копировать ability1.json`);
    await updateCopies(ability1, "ability1.json");
    console.log(`Завершил копировать ability1.json`);
  } catch (error) {
    console.log("Ошибка при сохранении всех копий: ", error);
  }
};

module.exports = { updtateAllCopies };
