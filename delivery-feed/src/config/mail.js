export default {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  from: process.env.MAIL_FROM,
  secure: process.env.MAIL_SECURE === true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
};
