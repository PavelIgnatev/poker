const { CronJob } = require("cron");

const { parseCurrencyRate } = require("../currencyRate/parseCurrencyRate");
const { updateServer } = require("../update/updateServer");
const { writeFile } = require("../../utils/promisify");

const crons = () => {
  // при инициализации сервера чтобы isUpdated переходило в false
  writeFile("src/store/update/update.json", JSON.stringify({ isUpdated: false }));

  const updateServerCron = new CronJob("0 0 * * *", function () {
    if (global.app.server.address().port === 81) {
      updateServer();
    }
  });

  const updateCNYCourseCron = new CronJob("0 */30 * * * *", function () {
    if (global.app.server.address().port === 81) {
      parseCurrencyRate();
    }
  });

  updateServerCron.start();
  updateCNYCourseCron.start();
};

module.exports = { crons };
