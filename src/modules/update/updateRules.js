async function updateRules(preview) {
  const settings = {};

  const levels = Object.keys(preview);
  levels.forEach((level) => {
    preview[level].forEach((tournament) => {
      let { network, level, currency, bid, status, name } = tournament;
      let time = name.split(")(")[1];
      if (!time?.includes(":")) time = "all";
      name = name.split(" (A1:")[0].split(" (A2: ")[0];

      if (!settings[network]) settings[network] = {};
      if (!settings[network][time]) settings[network][time] = {};
      if (!settings[network][time][level]) settings[network][time][level] = {};
      if (!settings[network][time][level][currency]) settings[network][time][level][currency] = {};
      if (!settings[network][time][level][currency][bid])
        settings[network][time][level][currency][bid] = {};
      if (!settings[network][time][level][currency][bid][status])
        settings[network][time][level][currency][bid][status] = {};
      if (!settings[network][time][level][currency][bid][status])
        settings[network][time][level][currency][bid][status][name] = {};

    });
  });
}

module.exports = { updateRules };
