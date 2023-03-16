const { CronJob } = require("cron");

const { updateServer } = require("../update/updateServer");
const { writeFile } = require("../../utils/promisify");

const crons = () => {
  // при инициализации сервера чтобы isUpdated переходило в false
  writeFile("src/store/update/update.json", JSON.stringify({ isUpdated: false }));

  const updateServerCron = new CronJob("0 0 * * *", function () {
    updateServer();
  });

  updateServerCron.start();
};

module.exports = { crons };
