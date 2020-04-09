import Mail from "../lib/Mail";
import mailConfig from "../config/mail";

const MAIL_CREATION_SUBJECT = "Busca Delivery - Criação de Conta";

export default {
  key: "AccountCreationMail",
  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      from: mailConfig.from,
      to: `${user.name} <${user.email}>`,
      subject: MAIL_CREATION_SUBJECT,
      html: `Olá, ${user.name}, bem-vindo ao sistema de filas da Rocketseat :D`
    });
  }
};
