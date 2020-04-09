import Mail from "../lib/Mail";
import mailConfig from "../config/mail";

const MAIL_CONFIRM_SUBJECT =
  process.env.MAIL_CONFIRM_SUBJECT || "Busca Delivery - Confirmação de Conta";

export default {
  key: "RegistrationMail",
  async handle({ data }) {
    const { mailData } = data;

    await Mail.sendMail({
      from: mailConfig.from,
      to: `${mailData.name} <${mailData.email}>`,
      subject: MAIL_CONFIRM_SUBJECT,
      html: `Olá, ${mailData.name}, bem-vindo ao sistema de filas da Rocketseat :D`
    });
  }
};
