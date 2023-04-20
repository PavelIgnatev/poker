const Excel = require("exceljs");
const { getConfig } = require("../../utils/config");
const { writeFile } = require("../../utils/promisify");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const promiseWrapper = (mailOptions, transporter) =>
  new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(info);
    });
  });

const mailOptions = (mails, html, content, filename) => {
  //as.dsa.20@mail.ru
  //PU22EfyoAps$

  //behaappy@ya.ru
  return {
    from: "offstakepocarr@gmail.com",
    to: mails,
    subject: `Erroneous tournaments for ${filename}`,
    html,
    attachments: [
      {
        filename,
        content,
        contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ],
  };
};

const sendMail = async (mail, tournaments, html, region, transporter) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Debtors");
  worksheet.columns = [
    { header: "Level", key: "@level" },
    { header: "Alias", key: "@alias" },
    { header: "Date", key: "@d" },
    { header: "Time", key: "@times" },
    { header: "Network", key: "@network" },
    { header: "ID", key: "@id" },
    { header: "Nickname", key: "@nickname" },
    { header: "Name", key: "@name" },
    { header: "Buy-in", key: "@bid" },
    { header: "Prize", key: "@prize" },
    { header: "Guarantee", key: "@prizepool" },
    { header: "ReEntry", key: "@multientries" },
    { header: "Entrants", key: "@totalEntrants" },
    { header: "A1", key: "@ability" },
    { header: "A2", key: "@abilityBid" },
  ];

  Array.from(tournaments).forEach((e) => {
    worksheet.addRow(e);
  });

  const buffer = await workbook.xlsx.writeBuffer();

  const currentTime = new Date(
    new Date(Date.now() - 2 * 86400000).toLocaleString("en-EN", {
      timeZone: "UTC",
    }),
  );
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const date = `${year}-${month}-${day}`;
  const filename = `${region}-${date}.xlsx`;

  try {
    if (region) {
      console.log(`Начинаю создавать таблицу со статистикой игороков по региону: ${region}`);
      await writeFile(`src/store/xlsx/${filename}`, buffer);
      console.log(
        `Создание таблицы со статистикой игороков по региону ${region} успешно завершилось`,
      );
    }
  } catch (e) {
    console.log(`Не удалось создать таблицу со статистикой игороков по региону: ${region}`);
  }

  for (let i = 0; i < 5; i++) {
    try {
      console.log("Попытка отправить номер ", i);
      await promiseWrapper(mailOptions(mail, html, buffer, filename), transporter);
      break;
    } catch (e) {
      console.log(e);
    }
  }
};

const sendStatistics = async (errorTournaments, transporter) => {
  console.log("Начинаю отправлять статистику по турнирам");

  const errorAliases = [];
  const config = await getConfig();
  const errorTournamentsByRegion = {};
  const aliases = Object.keys(errorTournaments);

  if (!aliases.length) {
    console.log("Нечего отправлять, все сыграли правильные турниры", new Date());
    return;
  }

  console.log("Начал отправку по зонам");

  for (let i = 0; i < aliases.length; i++) {
    const alias = aliases[i];

    if (!config[alias]) {
      continue;
    }

    const { address } = config[alias];

    if (!address) {
      continue;
    }

    if (!errorTournamentsByRegion[address]) {
      errorTournamentsByRegion[address] = [errorTournaments[alias]];
    } else {
      errorTournamentsByRegion[address].push(errorTournaments[alias]);
    }
  }

  for (let key in errorTournamentsByRegion) {
    const message = errorTournamentsByRegion[key];

    let region;

    switch (key) {
      case "pocarrelite@gmail.com":
        region = "International";
        break;

      case "mgr.miranda85@gmail.com":
        region = "Latina";
        break;

      case "pocarr.ru@gmail.com":
        region = "Pocarr Team";
        break;

      case "pocarr.esoffstake@gmail.com":
        region = "Spanish";
        break;
    }

    try {
      console.log(`Начал отправлять статистику по турнирам на ${key}`);
      if (message?.flat()?.length && region) {
        await sleep(30000);
        await sendMail(
          [`palllkaignatev@yandex.ru,behaappy@ya.ru,${key}`],
          message.flat(),
          `<div style='display:none'>${JSON.stringify(message)}</div>`,
          region,
          transporter,
        );
        console.log(`Закончил отправлять статистику по турнирам на почту ${key}`);
      } else {
        console.log(`Статистика по турнирам не отправлена, так как сообщение пустое`);
      }
    } catch (error) {
      console.log(`Отправка не письма на почту ${key} не удалась, произошла ошибка: `, error);
    }
  }

  console.log("Закончил отправку по зонам");

  console.log("Начинаю отправлять статистику по турнирам на почты игроков");

  for (let i = 0; i < aliases.length; i++) {
    const alias = aliases[i];

    if (!config[alias]) {
      continue;
    }

    const { mail } = config[alias];

    try {
      if (mail) {
        await sleep(30000);
        await sendMail(
          [mail],
          Array.from(errorTournaments[alias]),
          `<div style='display:none'>${JSON.stringify(errorTournaments)}</div>`,
          "",
          transporter,
        );
      }
    } catch {
      errorAliases.push(alias);
    }
  }

  console.log("Закончил отправлять статистику по турнирам на почты игроков");

  transporter.close();
};

module.exports = { sendStatistics };
