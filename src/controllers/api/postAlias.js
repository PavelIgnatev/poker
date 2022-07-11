const { updateRules } = require("../../modules/update/updateRules");
const { readFile, writeFile } = require("../../utils/promisify");

module.exports = async (req, res) => {
  console.log("Начинаю обновлять алиас");
  try {
    let { level, name } = req.body;
    let prevAlias = JSON.parse(await readFile("src/store/alias/alias.json"));

    if (req.body.method === "add") {
      console.log(name);
      try {
        prevAlias[name] = { level };
        console.log(
          "Алиас " + JSON.stringify(name) + " сменил свой уровень на ",
          level
        );
      } catch (error) {
        console.log(error);
        console.log(
          "Алиас " + JSON.stringify(name) + " не смог сменить свой уровень на ",
          level
        );
      }

      await writeFile("src/store/alias/alias.json", JSON.stringify(prevAlias));
    } else {
      try {
        delete prevAlias[name];
        console.log("Алиас " + JSON.stringify(name) + " удален");
      } catch (error) {
        console.log("Алиас " + JSON.stringify(name) + " не был удален, ошибка");
        console.log(error);
      }

      await writeFile("src/store/alias/alias.json", JSON.stringify(prevAlias));
    }
  } catch (error) {
    res.status(500).json({});
    console.log(error);
  }
  res.json("");
};
