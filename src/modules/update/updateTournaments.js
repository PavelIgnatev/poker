const { readdirSync } = require("fs");
const { compress } = require("compress-json");

const { api } = require("../../api");
const { writeFile } = require("../../utils/promisify");

const url =
  "https://www.sharkscope.com/api/pocarrleaderboard/reports/dailyscheduledtournaments/networks/";
const networks =
  "888Poker,GGNetwork,PartyPoker,PokerStars,WPN,PokerStars(FR-ES-PT),Winamax.fr,Chico,iPoker";

async function updateTournaments() {
  try {
    const days = readdirSync("src/store/days").map((day) => day.replace(".json", ""));

    const currentTime = new Date(Date.now() - 2 * 86400000);
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDate();
    const date = `${year}-${month}-${day}`;

    if (days.indexOf(date) === -1) {
      console.log(`Добавляем новый день ${date} в базу`);

      const { DailyScheduledTournamentResponse: { ScheduledTournament } = {} } =
        (await api.get(`${url}/${networks}?date=${date}`)) ?? {};

      if (!ScheduledTournament) {
        console.log(`Нет информации по дню ${date}`);
      }

      await writeFile(`src/store/days/${date}.json`, JSON.stringify(compress(ScheduledTournament)));

      console.log(`День ${date} успешно добавлен в базу`);
    } else {
      console.log(`День ${date} уже в базе`);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = { updateTournaments };

updateTournaments();
