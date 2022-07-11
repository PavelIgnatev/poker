const { readFile } = require("../../utils/promisify");
const { updateCopies } = require("../update/updateCopies");

async function saveCopyAlias() {
  const aliases = JSON.parse(await readFile("src/store/alias/alias.json"));

  await updateCopies(aliases, "alias.json");
}

module.exports = { saveCopyAlias };
