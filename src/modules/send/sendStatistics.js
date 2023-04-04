const { createTransport } = require("nodemailer");
const Excel = require("exceljs");

const { getEmail } = require("../../utils/email");
const { writeFile } = require("../../utils/promisify");

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

  return {
    from: "pokerteamsoft@gmail.com",
    to: mails,
    subject: `Statistics of incorrectly played tournaments for ${date}`,
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

const sendMail = async (mail, tournaments, html, transporter) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Debtors");
  worksheet.columns = [
    { header: "ID", key: "@id" },
    { header: "Date", key: "@d" },
    { header: "Time", key: "@times" },
    { header: "Alias", key: "@alias" },
    { header: "Nickname", key: "@nickname" },
    { header: "Level", key: "@level" },
    { header: "Network", key: "@network" },
    { header: "Prizepool", key: "@prizepool" },
    { header: "Name", key: "@name" },
    { header: "Buy-in", key: "@bid" },
    { header: "Prize", key: "@prize" },
    { header: "Reentry", key: "@multientries" },
    { header: "Entrants", key: "@totalEntrants" },
    { header: "Ability", key: "@ability" },
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
  const filename = `${date}.xlsx`;

  await writeFile(`src/store/xlsx/${filename}`, buffer);

  for (let i = 0; i < 5; i++) {
    try {
      console.log("Попытка отправить номер ", i);
      await promiseWrapper(mailOptions(mail, html, buffer), transporter);
      break;
    } catch (e) {
      console.log(e);
    }
  }
};

const sendStatistics = async (errorTournaments) => {
  const aliases = Object.keys(errorTournaments);

  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "pokerteamsoft@gmail.com",
      pass: "yrvqnyfvqrcqjcei",
    },
    tls: {
      minVersion: "TLSv1.2",
      rejectUnauthorized: true,
    },
  });

  const { email } = await getEmail();

  if (!aliases.length) {
    console.log("Нечего отправлять, все сыграли правильные турниры", new Date());
    return;
  }
  console.log("Начинаю отправлять статистику по турнирам на почту админов");
  console.log(email);
  try {
    await sendMail(
      [`${email},pokerteamsoft@gmail.com`],
      Object.values(errorTournaments).flat(),
      `<div style='display:none'>${JSON.stringify(errorTournaments)}</div>`,
      transporter,
    );
    console.log("Закончил отправлять статистику по турнирам на почту админов");
  } catch (error) {
    console.log("Отправка не письма на почту админов не удалась, произошла ошибка: ", error);
  }

  transporter.close();
};

module.exports = { sendStatistics };
