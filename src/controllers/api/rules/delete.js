const { filterRules } = require("../../../helpers/filterRules");
const { findInArray } = require("../../../helpers/findInArray");
const { renderRules } = require("../../../modules/render/renderRules");
const { writeFile } = require("../../../utils/promisify");
const { getRules, saveRules } = require("../../../utils/rules");

module.exports = async (req, res) => {
  const data = req.body;

  const rules = await getRules();
  const index = findInArray(rules, data);

  if (index !== -1) {
    rules.splice(index, 1);
  }

  await saveRules(rules);
  await writeFile("src/modules/filter/filter.js", renderRules(rules));

  res.status(200).send(rules);
};
