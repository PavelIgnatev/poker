const { createTransport } = require("nodemailer");
const Excel = require("exceljs");

// user: "as.dsa.20@mail.ru",
// pass: "NkpGmnhWqfXkPLMbvUZz",

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "pocarr.offstake@gmail.com",
    pass: "odouugoikgkugvyj",
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

const mailOptions = (mails, content, title) => {
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
    from: "pocarr.offstake@gmail.com",
    to: mails,
    subject: `Zero Ability2 ${title} tournaments by ${date}`,
    attachments: [
      {
        filename,
        content,
        contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ],
  };
};

const sendMail = async (mail, tournaments, title) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Debtors");
  worksheet.columns = [
    { header: "Level", key: "l" },
    { header: "Network", key: "r" },
    { header: "Currency", key: "c" },
    { header: "Bid", key: "b" },
    { header: "Status", key: "s" },
    { header: "Color", key: "color" },
  ];

  tournaments.forEach((e) => {
    worksheet.addRow(e);
  });

  const buffer = await workbook.xlsx.writeBuffer();

  for (let i = 0; i < 5; i++) {
    try {
      console.log("Попытка отправить номер ", i);
      await promiseWrapper(mailOptions(mail, buffer, title));
      break;
    } catch (e) {
      console.log(e);
    }
  }
};

const sendZeroAbility2 = async (zeroTournaments, title) => {
  console.log("Начинаю отправлять турниры, которые имеют нулевое абилити2");

  if (!zeroTournaments.length) {
    console.log("Нечего отправлять, все турниры имеют абилити 2", new Date());
    return;
  }

  try {
    await sendMail(
      ["behaappy@ya.ru,palllkaignatev@ya.ru,pocarr.offstake@gmail.com"],
      zeroTournaments,
      title,
    );
  } catch (error) {
    console.log("При отправке произошла ошибка", error);
  }
};

module.exports = { sendZeroAbility2 };
