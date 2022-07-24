const { readFile } = require("../../utils/promisify");
const { updateCopies } = require("../update/updateCopies");

async function saveCopyConfig() {
  const config = JSON.parse(await readFile("src/store/config/config.json"));

  await updateCopies(config, "config.json");
}

module.exports = { saveCopyConfig };
