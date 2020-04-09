import Mail from "../lib/Mail";
import mailConfig from "../config/mail";
import TemplateEngine from "../lib/TemplateEngine";

const JOB_KEY = "RegistrationMail";
const MAIL_TEMPLATE = JOB_KEY;
const MAIL_CONFIRM_SUBJECT =
  process.env.MAIL_CONFIRM_SUBJECT || "Busca Delivery - Confirmação de Conta";

export default {
  key: JOB_KEY,
  async handle({ data }) {
    const { mailData } = data;
    const html = TemplateEngine.engine.render(MAIL_TEMPLATE, mailData);
    const to = `${mailData.name} <${mailData.email}>`;
    await Mail.sendMail({
      from: mailConfig.from,
      to,
      subject: MAIL_CONFIRM_SUBJECT,
      html
    });
    console.log(JOB_KEY + " - Mail sent sucessfully to " + to);
  }
};
