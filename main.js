const fs = require("fs");
const { writeFile } = require("./src/utils/promisify");
// УЧИТЫВАТЬ offpeak
// //   1. Учимся просто добавлять правило, чтобы было
// //   2. Учимся добавлять составное
// //   3. Учимся добавлять проверки между (типо KO)
// //   4. Учимся добавлять проверки на синие красные и тп

// (() => {
//   const types = ["MELE", "MELEI", "EME", "TEMEI", "EMEI", "MELEME", "EI", "I", "FLAGS", "StardDay"];
//   const example = {
//     "PS.eu":
//     GG: [
//       [
//         { type: "MELE", values: [1.0, 9], offpeak: true },
//         { type: "MELE", values: [1.0, 7.5], offpeak: true },
//       ],
//       { type: "MELE", values: [109.0, 150000], offpeak: true },
//       { type: "MELEME", values: [121.0, 150.0, 250000], offpeak: true },
//     ],
//   };

//   fs.open("src/modules/filter/filter.js", "w", (err) => {
//     if (err) throw err;
//   });

//   writeFile(
//     "src/modules/filter/filter.js",
//     Object.keys(example)
//       .map((network) => {
//         return `if(network === '${network}'){
//   ${example[network]
//     .map((rule) => {
//       if (Array.isArray(rule)) {
//         return `if(${rule
//           .map((minirule) => minirule.type + "(" + minirule.values.join(",") + ")")
//           .join(" && ")}) return true;`;
//       } else {
//         return `if(${rule.type}(${rule.values.join(",")})) return true;`;
//       }
//     })
//     .join("")}
// }`.replace(new RegExp("\\r?\\n", "g"), "");
//       })
//       .join(""),
//   );

//   return Object.keys(example).map((network) => {
//     return `if(network === '${network}'){
//       ${example[network]
//         .map((rule) => {
//           if (Array.isArray(rule)) {
//           } else {
//             return `if(${rule.type}(${rule.values.join(",")})) return true;`;
//           }
//         })
//         .join("")}
//     }`.replace(new RegExp("\\r?\\n", "g"), "");
//   });
// })();
