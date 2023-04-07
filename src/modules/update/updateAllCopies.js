const { getConfig } = require("../../utils/config");
const { updateCopies } = require("./updateCopies");

const updtateAllCopies = async () => {
  try {
    const config = await getConfig();

    console.log(`Начал копировать rules.json`);
    await updateCopies(rules, "rules.json");
    console.log(`Завершил копировать rules.json`);

    console.log(`Начал копировать config.json`);
    await updateCopies(config, "config.json");
    console.log(`Завершил копировать config.json`);
  } catch (error) {
    console.log("Ошибка при сохранении всех копий: ", error);
  }
};

module.exports = { updtateAllCopies };
