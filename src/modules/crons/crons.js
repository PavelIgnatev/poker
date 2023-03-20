const { CronJob } = require("cron");

const { updateServer } = require("../update/updateServer");
const { writeFile } = require("../../utils/promisify");

const crons = () => {
  const updateServerCron = new CronJob("0 0 * * *", function () {
    updateServer();
  });

  updateServerCron.start();
};

module.exports = { crons };
