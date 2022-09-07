const express = require("express");
const CronJob = require("cron").CronJob;

const { PORT } = require("./config");
const setupMiddlewares = require("./middlewares");
const { apiRouter, mainRouter } = require("./routers");
const app = express();
const { updateServer } = require("./modules/update/updateServer");
const { collectionStatistics } = require("./modules/collection/collectionStatistics");
const { getRules, saveRules } = require("./utils/rules");

// setup other
setupMiddlewares(app);

// api routes
app.use("/api", apiRouter);

// main routes
app.use("/", mainRouter);

app.listen(process.env.PORT || PORT, async () => {
  console.log("Сервер запущен", new Date());
  // const prevErrorTournaments = JSON.parse(await readFile(`src/store/errors/errorTournaments.json`));
  // sendStatistics(prevErrorTournaments);
  // try {
  //   await updateServer();
  // } catch (error) {
  //   console.log("При обновлении сервера произошла ошибка", error);
  // }
  // const rules = await getRules();
  // const newRules = [];
  // rules.map((rule) => {
  //   const oneRule = rule[0];
  //   if ((oneRule.color === "blue" || oneRule.color === "red") && oneRule.network === "WNMX") {
  //     newRules.push([{ ...oneRule, network: "IP" }]);
  //   }
  //   if ((oneRule.color === "blue" || oneRule.color === "red") && oneRule.network === "WPN") {
  //     newRules.push([{ ...oneRule, network: "Chico" }]);
  //   }
  // });
  // await saveRules(rules.concat(newRules));
});

const job = new CronJob(
  "0 0 * * *",
  async function () {
    try {
      await updateServer();
    } catch (error) {
      console.log("При обновлении сервера произошла ошибка", error);
    }
  },
  null,
  true,
  "America/New_York",
);
job.start();
