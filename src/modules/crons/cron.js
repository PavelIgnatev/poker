const { CronJob } = require("cron");

const { parseCurrencyRate } = require("../parseCurrencyRate/parseCurrencyRate");
const { updatePartServer } = require("../update/updatePartServer");

const crons = () => {
  const updatePartServerCron = new CronJob("0 0 * * *", function () {
    updatePartServer();
  });

  const updateCNYCourseCron = new CronJob("0 */30 * * * *", function () {
    parseCurrencyRate();
  });

  updatePartServerCron.start();
  updateCNYCourseCron.start();
};

module.exports = { crons };
