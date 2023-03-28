const { readFile, writeFile } = require("../../utils/promisify");
const { getTimeByMS } = require("../../helpers/getTimeByMS");
const { getNetwork } = require("../../helpers/getNetwork");
const { getTournaments } = require("../../helpers/getTournaments");


const IGNORELIST = ["scoop", "wsop"];
const validateName = (name, ignoreList) => {
  if(!name) return ''
  else name = name.toLowerCase();

  const cleanedName = name.replace(/[^\w]/gi, "").replace(/\d+/g, "");

  
  const hasIgnoreWords = ignoreList.some(word => cleanedName.toLowerCase().includes(word.toLowerCase()));
  
  if (hasIgnoreWords) {
    return name;
  }
  
  return cleanedName;
}



const updateAbility1 = async () => {
  try {
    const { tournaments: state } = getTournaments();

    const obj = {};

    Object.values(state).forEach((tournamentsByDay) => {
      Object.values(tournamentsByDay).forEach((tournament) => {
        const ability = tournament["@avability"];
        const duration = tournament["@duration"];
        const name = validateName(tournament["@name"], IGNORELIST);
        const network = getNetwork(tournament["@network"]);
        const stake = Number(tournament["@stake"] ?? 0);
        const rake = Number(tournament["@rake"] ?? 0);
        const bid = (stake + rake).toFixed(2);
        const time = getTimeByMS(Number(`${tournament["@date"]}000`));

        if (!name || !network || !bid || !time || name?.includes("global million")) {
          return;
        }

        if (!obj[network]) obj[network] = {};
        if (!obj[network][time]) obj[network][time] = {};
        if (!obj[network][time][bid]) obj[network][time][bid] = {};
        if (!obj[network][time][bid][name])
          obj[network][time][bid][name] = {
            "@avability": [],
            "@duration": [],
          };

        const abilities = obj[network][time][bid][name]["@avability"];
        const durations = obj[network][time][bid][name]["@duration"];

        if (ability) abilities.push(ability);
        if (duration) durations.push(duration);
      });
    });

    Object.keys(obj).forEach((day) => {
      Object.keys(obj[day]).forEach((time) => {
        Object.keys(obj[day][time]).forEach((bid) => {
          Object.keys(obj[day][time][bid]).forEach((name) => {
            Object.keys(obj[day][time][bid][name]).forEach((info) => {
              const values = obj[day][time][bid][name][info];
              const length = values.length || 1;

              obj[day][time][bid][name][info] = Math.round(
                Number(values.reduce((r, i) => r + Number(i), 0) / length),
              );
            });
          });
        });
      });
    });


    await writeFile("src/store/ability1/ability1.json", JSON.stringify(obj));
  } catch (error) {
    console.log(error);
  }
};



module.exports = { updateAbility1 };
