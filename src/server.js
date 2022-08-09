const express = require("express");
const CronJob = require("cron").CronJob;

const { PORT } = require("./config");
const setupMiddlewares = require("./middlewares");
const { apiRouter, mainRouter } = require("./routers");
const app = express();
const { updateServer } = require("./modules/update/updateServer");

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
  // run();
  // await updateServer();
});

const job = new CronJob(
  "0 0 * * *",
  function () {
    updateServer();
  },
  null,
  true,
  "Europe/Moscow",
);
job.start();
