const fs = require("fs");
const { renderRules } = require("./src/modules/render/renderRules");
const { writeFile } = require("./src/utils/promisify");
// УЧИТЫВАТЬ offpeak
//   1. Учимся просто добавлять правило, чтобы было
//   2. Учимся добавлять составное
//   3. Учимся добавлять проверки между (типо KO)
//   4. Учимся добавлять проверки на синие красные и тп

(() => {
  const example = [
    [
      {
        type: "MELE",
        values: [1.0, 9],
        color: "red",
        level: "7A",
        offpeak: false,
        KO: true,
        status: "Turbo",
        network: "GG",
      },
      {
        type: "MELE",
        values: [1.0, 7.5],
        color: "red",
        level: "7A",
        offpeak: true,
        status: "Turbo",
        KO: true,
        network: "PS.eu",
      },
    ],
    {
      type: "MELE",
      values: [109.0, 150000],
      color: "black",
      level: "7A",
      status: "Normal",
      offpeak: true,
      KO: false,
      network: "GG",
    },
    {
      type: "MELEME",
      values: [121.0, 150.0, 250000],
      color: "black",
      status: "SuperTurbo",
      level: "8A",
      offpeak: true,
      KO: true,
      network: "GG",
    },
  ];

  console.log(renderRules(example));

  writeFile("src/modules/filter/filter.js", renderRules(example));

  return "";
})();
