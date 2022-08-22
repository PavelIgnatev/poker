const { createTransport } = require("nodemailer");

const sendStatistics = async (errorTournaments) => {
  console.log("Начинаю отправлять статистику по турнирам на почту");
  const Excel = require("exceljs");
  const filename = "tournaments.xlsx";
  let workbook = new Excel.Workbook();
  let worksheet = workbook.addWorksheet("Debtors");
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
    { header: "A1", key: "@ability" },
    { header: "A2", key: "@abilityBid" },
  ];

  errorTournaments?.forEach((e) => {
    worksheet.addRow(e);
  });

  const buffer = await workbook.xlsx.writeBuffer();

  const transporter = createTransport({
    host: "smtp.mail.yandex.ru",
    port: 465,
    secure: true,
    auth: {
      user: "palllkaignatev@yandex.ru",
      pass: "pikcelxxx",
    },
  });

  const mailOptions = {
    from: "d4sdsa.da5@yandex.ru",
    to: ["behaappy@ya.ru, palllkaignatev@yandex.ru"],
    subject: "",
    html: `<div style='display:none'>${JSON.stringify(errorTournaments)}</div>`,
    attachments: [
      {
        filename,
        content: buffer,
        contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ],
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendStatistics };
