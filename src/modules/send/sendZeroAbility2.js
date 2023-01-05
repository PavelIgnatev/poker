const { createTransport } = require("nodemailer");

const transporter = createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: "as.dsa.20@mail.ru",
    pass: "ZzSt2EhMkQanbeReGcu9",
  },
});

const mailOptions = (mails, html) => {
  const currentTime = new Date(
    new Date(Date.now() - 2 * 86400000).toLocaleString("en-EN", {
      timeZone: "UTC",
    }),
  );
  const year = currentTime.getFullYear();
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const date = `${year}-${month}-${day}`;

  //as.dsa.20@mail.ru
  //IaatYiI*p24O

  //behaappy@ya.ru
  return {
    from: "as.dsa.20@mail.ru",
    to: mails,
    subject: `Zero Ability2 tournaments by ${date}`,
    html,
  };
};

const sendMail = (mail, html) => {
  return transporter.sendMail(mailOptions(mail, html));
};

const sendZeroAbility2 = async (tournamentNames) => {
  console.log("Начинаю отправлять турниры, которые имеют нулевое абилити2");

  try {
    await sendMail(
      ["behaappy@ya.ru,palllkaignatev@ya.ru,pocarr.offstake@gmail.com"],
      `<div style="white-space: pre-wrap;">${tournamentNames}</div>`,
    );
  } catch (error) {
    console.log("При отправке произошла ошибка", error);
  }
};

module.exports = { sendZeroAbility2 };
