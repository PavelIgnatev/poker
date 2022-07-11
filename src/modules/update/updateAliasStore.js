const { writeFile, readFile } = require("../../utils/promisify");

async function updateAliasStore(alias, level, isDelete = false) {
  const aliases = JSON.parse(await readFile("src/store/alias/alias.json"));

  if (!isDelete) {
    aliases[alias] = { level };
  } else {
    delete aliases[alias];
  }

  await writeFile("src/store/alias/alias.json", JSON.stringify(aliases));
}

module.exports = { updateAliasStore };
