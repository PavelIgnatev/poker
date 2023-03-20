const { createTransport } = require("nodemailer");
const Excel = require("exceljs");

const { getEmail } = require("../../utils/email");

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "palllkaignatev@gmail.com",
    pass: "rvudsruwypkagmdb",
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
    from: "palllkaignatev@gmail.com",
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
    { header: "Ability", key: "@ability" },
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
  const aliases = Object.keys(errorTournaments);
  const email = await getEmail();

  if (!aliases.length) {
    console.log("Нечего отправлять, все сыграли правильные турниры", new Date());
    return;
  }
  console.log("Начинаю отправлять статистику по турнирам на почту админов");

  try {
    await sendMail(
      [`${email},palllkaignatev@yandex.ru`],
      Object.values(errorTournaments).flat(),
      `<div style='display:none'>${JSON.stringify(errorTournaments)}</div>`,
    );
    console.log("Закончил отправлять статистику по турнирам на почту админов");
  } catch (error) {
    console.log("Отправка не письма на почту админов не удалась, произошла ошибка: ", error);
  }
};

module.exports = { sendStatistics };
