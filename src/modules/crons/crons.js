const { CronJob } = require("cron");

const { updateServer } = require("../update/updateServer");
const { parseCurrencyRate } = require("../currencyRate/parseCurrencyRate");

const crons = () => {
  const updateServerCron = new CronJob("0 0 * * *", function () {
    updateServer();
  });

  const updateCNYCourseCron = new CronJob("0 0 * * *", function () {
    parseCurrencyRate();
  });

  updateServerCron.start();
  updateCNYCourseCron.start();
};

module.exports = { crons };
