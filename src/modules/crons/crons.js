const { CronJob } = require("cron");

const { updateServer } = require("../update/updateServer");
const { writeFile } = require("../../utils/promisify");

const startValue = 81;
const arrayLength = 1;

function numberInArray(num, arr) {
  return Array(arrayLength)
    .fill()
    .map((_, index) => startValue + index)
    .includes(num);
}

const crons = () => {
  // при инициализации сервера чтобы isUpdated переходило в false
  writeFile("src/store/update/update.json", JSON.stringify({ isUpdated: false }));

  const updateServerCron = new CronJob("0 0 * * *", function () {
    if (numberInArray(global.app.server.address().port)) {
      updateServer();
    }
  });


  updateServerCron.start();
};

module.exports = { crons };
