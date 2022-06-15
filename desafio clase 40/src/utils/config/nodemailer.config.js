const nodemailer = require('nodemailer');
const fs = require('fs');
const env = require("./env.config");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: env.ADMIN_MAIL,
    pass: env.ADMIN_PASS
  }
});

const mailOptions = async (mail, subject, user) => {
  let to;
  if(mail == "admin") to = env.ADMIN_MAIL
  else to = mail;
  return {
    from: '',
    to,
    subject,
    html: await fs.promises.readFile(process.cwd() + `/src/utils/response/users/${user}.html`),
  }
};

const sendMail = async (mail, subject, user) => {
  try {
    await transporter.sendMail(await mailOptions(mail, subject, user));
  } catch (error) {
    console.error("ERROR: ", error);
  }
};

module.exports = sendMail;