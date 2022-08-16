const { readFile } = require("../../utils/promisify");
const { getRulesAbility2 } = require("../../utils/rules");
const { updateCopies } = require("../update/updateCopies");

async function saveCopyRules() {
  const rules = await getRulesAbility2();

  await updateCopies(rules, "rules.json");
}

module.exports = { saveCopyRules };
