const nodemailer = require("nodemailer");
// const user = process.env.user;
// const password = process.env.pass;

const sendMail = async (config) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "ugochukwuchioma16@gmail.com",
        pass: "Ikechukwu82",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const info = await transporter.sendMail({
      from: "ugochukwuchioma16@gmail.com",
      ...config,
    });
    return `Preview URL: %s`, `${nodemailer.getTestMessageUrl(info)}`;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { sendMail };
