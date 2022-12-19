const { getRules, saveRules } = require("../../../utils/rules");
const { renderRules } = require("../../../modules/render/renderRules");
const { writeFile } = require("../../../utils/promisify");
const { findInArray } = require("../../../helpers/findInArray");

module.exports = async (req, res) => {
  const { rules: bodyRules } = req.body;
  const rules = await getRules();

  const index = findInArray(rules, bodyRules);

  if (index !== -1) {
    return res.status(400).send({ message: "The rule already exists" });
  }

  rules.push(bodyRules);
  const rulesContent = await renderRules(rules);

  await saveRules(rules);

  await writeFile("src/modules/filter/filter.js", rulesContent);
  await writeFile("client/src/modules/filter/filter.js", rulesContent);

  res.status(200).send(rules);
};
