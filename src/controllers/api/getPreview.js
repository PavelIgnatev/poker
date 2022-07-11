const { readFile } = require("../../utils/promisify");

module.exports = async (req, res) => {
  let preview;
  try {
    preview = JSON.parse(await readFile("src/store/rules/preview.json"));
  } catch (erorr) {
    console.log(error);
    await new Promise((res) => setTimeout(() => res(), 500));
    preview = JSON.parse(await readFile("src/store/rules/preview.json"));
  }
  res.json(preview);
};
