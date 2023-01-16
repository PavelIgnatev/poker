const { api } = require("../../api");

const getTournaments = async (req, res) => {
  try {
    const {
      network,
      time,
    } = req.query;

    if (network == "undefined") {
      return res.status(404).send({
        message: "Select game network",
      });
    }
    console.log('делаю запрос')
    const { RegisteringTournamentsResponse } =
      await api.get(
        `https://www.sharkscope.com/api/komanda/networks/${network}/activeTournaments?filter=Date!:${time}S;Type:NL,H;Class:SCHEDULED,SNG;`,
      );
    console.log('получил ответ')
    if (!RegisteringTournamentsResponse) {
      return res.send([]);
    }

    const result = Array.from(RegisteringTournamentsResponse.RegisteringTournaments.RegisteringTournament);

    return res.send(result ?? []);
  } catch (err) {
    console.log(err);
    res.status(500).send([]);
  }
};

module.exports = {
  getTournaments,
};
