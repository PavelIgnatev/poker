const { api } = require("../../api");
const { getNetwork } = require("../../helpers/getNetwork");
const { writeFile, readFile } = require("../../utils/promisify");
const { isSuperTurbo } = require("../../helpers/isSuperTurbo");
const { isRebuy } = require("../../helpers/isRebuy");
const { isSat } = require("../../helpers/IsSat");

async function updateFiltredTournaments() {
  try {
    const prevState = JSON.parse(await readFile("src/store/tournaments/tournaments.json"));
    const state = {};
    const stateLength = Object.keys(prevState).length;
    console.log("Длина стейта до фильтра: ", stateLength);

    // Удаляем турики если их больше 90
    const my = Object.keys(prevState)
      .map((day) => new Date(day).getTime())
      .sort((a, b) => a - b);

    my.splice(0, Math.max(stateLength - 90, 0));

    my.forEach((timestamp) => {
      const currentTime = new Date(timestamp);
      const year = currentTime.getFullYear();
      const month = currentTime.getMonth() + 1;
      const day = currentTime.getDate();
      const date = `${year}-${month}-${day}`;
      state[date] = prevState[date];
    });

    console.log("Длина стейта после фильтра: ", Object.keys(state).length);

    const currentTime = new Date(Date.now() - 2 * 86400000);
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth() + 1;
    const day = currentTime.getDate();
    const date = `${year}-${month}-${day}`;

    if (!state[date]) {
      console.log(`Добавляем новый день ${date} в базу`);
      const tournaments = (
        await api.get(
          `https://www.sharkscope.com/api/pocarrleaderboard/reports/dailyscheduledtournaments/networks/888Poker,GGNetwork,PartyPoker,PokerStars,WPN,PokerStars(FR-ES-PT),Winamax.fr,Chico,iPoker?date=${date}`,
        )
      )?.DailyScheduledTournamentResponse?.ScheduledTournament;

      state[date] = tournaments;

      console.log(`День ${date} успешно добавлен в tournaments.json`);
    } else {
      console.log(`День ${date} уже в базе`);
    }

    await writeFile("src/store/tournaments/tournaments.json", JSON.stringify(state));

    console.log(`Перезаписал tournaments.json`);

    const filtredState = {};

    Object.keys(state).forEach((day) => {
      if (!filtredState[day]) filtredState[day] = {};
      filtredState[day] = state[day]?.filter((item) => {
        const od = item["@flags"]?.includes("OD"),
          sng = item["@gameClass"]?.includes("sng"),
          isNL = item["@structure"] === "NL",
          isH = item["@game"] === "H" || item["@game"] === "H6",
          name = item["@name"],
          sat = isSat(item);

        const network = getNetwork(item["@network"]);

        const rebuy = isRebuy(item);

        if (!name) return false;

        const superturbo = network === "WNMX" ? false : isSuperTurbo(item);

        if (isNL && isH && !rebuy && !od && !sng && !sat && !superturbo) {
          return true;
        }
        return false;
      });
    });

    console.log("Начал записывать filtredTournaments в базу");
    await writeFile("src/store/tournaments/filtredTournaments.json", JSON.stringify(filtredState));
    console.log("Записал filtredTournaments в базу");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { updateFiltredTournaments };
