const { createTransport } = require("nodemailer");
const Excel = require("exceljs");
const { getConfig } = require("../../utils/config");
const { readFile } = require("../../utils/promisify");

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "offstakepocarr@gmail.com",
    pass: "eszmpczpadbbbtok",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const promiseWrapper = (mailOptions) =>
  new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(info);
    });
  });

const mailOptions = (mails, html, content) => {
  const currentTime = new Date(
    new Date(Date.now() - 2 * 86400000).toLocaleString("en-EN", {
      timeZone: "UTC",
    }),
  );
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const date = `${year}-${month}-${day}`;
  const filename = `${date}.xlsx`;

  //as.dsa.20@mail.ru
  //PU22EfyoAps$

  //behaappy@ya.ru
  return {
    from: "offstakepocarr@gmail.com",
    to: mails,
    subject: `Erroneous tournaments for ${date}`,
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

const sendMail = async (mail, tournaments, html) => {
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

  for (let i = 0; i < 5; i++) {
    try {
      console.log("Попытка отправить номер ", i);
      await promiseWrapper(mailOptions(mail, html, buffer));
      break;
    } catch (e) {
      console.log(e);
    }
  }
};

const sendStatistics = async (errorTournaments) => {
  console.log("Начинаю отправлять статистику по турнирам на почты игроков");
  const errorAliases = [];
  const aliases = Object.keys(errorTournaments);


  if (!aliases.length) {
    console.log("Нечего отправлять, все сыграли правильные турниры", new Date());
    return;
  }
  // for (let i = 0; i < aliases.length; i++) {
  //   const alias = aliases[i];

  //   if (!config[alias]) {
  //     continue;
  //   }

  //   const { mail } = config[alias];

  //   try {
  //     await sendMail(
  //       [mail],
  //       Array.from(errorTournaments[alias]),
  //       `<div style='display:none'>${JSON.stringify(errorTournaments)}</div>`,
  //     );
  //   } catch {
  //     errorAliases.push(alias);
  //   }
  // }


  console.log("Закончил отправлять статистику по турнирам на почты игроков");
  console.log("Начинаю отправлять статистику по турнирам на почту админов");


  try {
    await sendMail(
      ["pocarrelite@gmail.com,mgr.miranda85@gmail.com,pocarr.ru@gmail.com,behaappy@ya.ru,palllkaignatev@yandex.ru"],
      Object.values(errorTournaments).flat(),
      `<div>Invalid emails from players: ${errorAliases.join(", ")}</div>
      <div style='display:none'>${JSON.stringify(errorTournaments)}</div>`,
    );
    console.log("Закончил отправлять статистику по турнирам на почту админов");
  } catch (error) {
    console.log("Отправка не письма на почту админов не удалась, произошла ошибка: ", error);
  }
};

module.exports = { sendStatistics };
