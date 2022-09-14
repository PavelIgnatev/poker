const { readFile } = require("../../utils/promisify");
const { getRulesAbility2 } = require("../../utils/rules");

const getFormingAbility2 = async (req, res) => {
  const state = JSON.parse(await readFile("src/store/ability2/formingAbility2.json"));
  const settings = await getRulesAbility2();

  const network = req.query.network;
  const level = req.query.level;
  const currency = req.query.currency;
  const realBid = req.query.bid;
  const status = req.query.status;

  const stateAbility = JSON.parse(await readFile("src/store/ability2/ability2WithoutName.json"));

  res.send(
    state?.[network]?.[level]?.[currency]?.[realBid]?.[status]?.map((item) => {
      const abilityBid = stateAbility?.[network]?.[level]?.[currency]?.[realBid]?.[status];
      const time = item["s"]?.split(" ")?.[2];
      const step = settings[network]?.[time]?.[level]?.[currency]?.[realBid]?.[status]?.[item["n"]]
        ? settings[network]?.[time]?.[level]?.[currency]?.[realBid]?.[status]?.[item["n"]]
        : settings[network]?.["all"]?.[level]?.[currency]?.[realBid]?.[status]?.["all"]
        ? settings[network]?.["all"]?.[level]?.[currency]?.[realBid]?.[status]?.["all"]
        : 0;

      return {
        ...item,
        "@scheduledStartDate": item["s"],
        "@duration": item["d"],
        "@guarantee": item["g"],
        "@name": item["n"],
        "@network": network,
        "@bid": item["b"],
        "@prizepool": item["p"],
        "@abilityBid": abilityBid ? Number(abilityBid) + Number(step) : "-",
        "@ability": Math.round(item["a"]),
      };
    }),
  );
};

module.exports = { getFormingAbility2 };
