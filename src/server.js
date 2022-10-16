const { PORT } = require("./config/");
const CronJob = require("cron").CronJob;
const { createFastifyInstance } = require("./createFastifyInstance");
const { updatePartServer } = require("./modules/update/updatePartServer");
const { readFile } = require("./utils/promisify");

const start = async () => {
  try {
    const fastify = await createFastifyInstance();

    if (!fastify) {
      console.error("Fastify не создался");
      return;
    }

    await fastify.listen({ port: PORT });

    fastify.log.info(`Сервер запущен ${new Date().toISOString()}`);

    // updatePartServer();
    const t = {
      "@duration": "04:56:49",
      "@date": "1665277129",
      "@reEntries": "63",
      "@tickets": "0",
      "@currency": "USD",
      "@filterString": "Class:SCHEDULED;Type:H,NL,N;Type!:R;StakePlusRake:USD109",
      "@flags": "ME",
      "@game": "H",
      "@gameClass": "scheduled",
      "@id": "3479213511",
      "@guarantee": "30000.0",
      "@name": "$109 Fenomeno Special, $30K Gtd - New Tournament!",
      "@network": "PS.eu",
      "@overlay": "800.0",
      "@playersPerTable": "8",
      "@rake": "9.0",
      "@stake": "100.0",
      "@state": "Completed",
      "@structure": "NL",
      "@totalEntrants": "229",
      TournamentEntry: {
        "@playerName": "Denvlas",
        "@position": "205",
      },
      "@bid": "109.00",
      "@turbo": false,
      "@rebuy": false,
      "@od": false,
      "@sat": false,
      "@bounty": false,
      "@sng": false,
      "@deepstack": false,
      "@superturbo": false,
      "@prizepool": 30000,
      "@ability": "-",
      "@abilityBid": 82,
      "@getWeekday": "Saturday",
      "@realDuration": 17809,
      "@alias": "Denvlas_pocarr",
      "@nickname": "Denvlas",
      "@prize": 0,
      "@d": "Oct 8",
      "@times": "16:02",
      "@level": "11B",
      "@multientries": 0,
      "@usdBid": "109.00",
      "@usdPrizepool": 30000,
    };
    const ability1 = JSON.parse(await readFile("src/store/ability1/ability1.json"));

    console.log(Object.keysability1[t["@network"]]);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start().catch();

process.on("unhandledRejection", (reason, promise) => {
  log.error({ reason, promise }, "серверный процесс unhandledRejection");
});
process.on("uncaughtException", (err) => {
  log.error({ err }, "серверный процесс uncaughtException");
});

const job = new CronJob("0 0 * * *", function () {
  updatePartServer();
});
job.start();
