const { CronJob } = require("cron");

const { parseCurrencyRate } = require("../currencyRate/parseCurrencyRate");
const { updateServer } = require("../update/updateServer");
const { writeFile } = require("../../utils/promisify");

const startValue = 81;
const arrayLength = 9;

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

  const updateCNYCourseCron = new CronJob("0 */30 * * * *", function () {
    if (numberInArray(global.app.server.address().port)) {
      parseCurrencyRate();
    }
  });

  updateServerCron.start();
  updateCNYCourseCron.start();
};

module.exports = { crons };
