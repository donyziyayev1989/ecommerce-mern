const nodemailer = require('nodemailer');
const asyncWrapper = require('./asyncWrapper');

const sendEmail = asyncWrapper(async (email, subject, html) => {
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME, // generated ethereal user
      pass: process.env.SMTP_PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: 'Ecommerce.com',
    to: email,
    subject: subject,
    html: html,
  });

  console.log('Email send successfully');
});

module.exports = sendEmail;
