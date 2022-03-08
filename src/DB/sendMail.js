const nodemailer = require("nodemailer");
const user = process.env.user;
const password = process.env.pass;

const sendMail = async (config) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user,
        password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const info = await transporter.sendMail({
      from: "mikeisash@gmail.com",
      ...config,
    });
    return `Preview URL: %s`, `${nodemailer.getTestMessageUrl(info)}`;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { sendMail };
