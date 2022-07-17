const { readFile } = require("../../utils/promisify");
const { updateCopies } = require("../update/updateCopies");

async function saveCopyRules() {
  const rules = JSON.parse(await readFile("src/store/rules/rules.json"));

  await updateCopies(rules, "rules.json");
}

module.exports = { saveCopyRules };
