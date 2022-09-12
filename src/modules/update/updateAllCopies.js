const { getConfig } = require("../../utils/config");
const { readFile } = require("../../utils/promisify");
const { getRulesAbility2 } = require("../../utils/rules");
const { updateCopies } = require("./updateCopies");

const updtateAllCopies = async () => {
  try {
    const rules = await getRulesAbility2();
    const config = await getConfig();
    const ability1 = JSON.parse(await readFile("src/store/ability1/ability1.json"));
    const ability2 = JSON.parse(await readFile("src/store/ability2/ability2WithoutName.json"));

    console.log(`Начал копировать ability1.json`);
    await updateCopies(ability1, "ability1.json");
    console.log(`Завершил копировать ability1.json`);

    console.log(`Начал копировать ability2.json`);
    await updateCopies(ability2, "ability2.json");
    console.log(`Завершил копировать ability2.json`);

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
