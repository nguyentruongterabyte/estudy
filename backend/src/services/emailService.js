import nodemailer from 'nodemailer';

require('dotenv').config();

const SMTP_EMAIL = process.env.SMTP_EMAIL || 'examples@gmail.com';
const SMTP_PASSWORD = process.env.SMTP_PASSWORD || '123456';
const SERVICE = 'gmail';

const sendEmail = ({ recipientEmail, subject = '', html = '' }) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: SERVICE,
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: SMTP_EMAIL,
      to: recipientEmail,
      subject,
      html,
    };

    transporter.sendMail(mailOptions, (error, _) => {
      if (error) {
        return reject(error.message);
      }

      resolve();
    });
  });
};

export default {
  sendEmail,
};
