import nodemailer from "nodemailer";
import { message } from "../utils/emailMsg";

class EmailService {
  static async sendEmail(
    recipient: string,
    service: string,
    userId: string,
    typeAction: string
  ): Promise<void> {
    const transportConfig = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: `${process.env.USER_PASS}#`,
      },
    });

    await transportConfig
      .sendMail({
        from: `Aunteticador ${service} <${process.env.USER_EMAIL}>`,
        to: recipient,
        subject: "Cadastro de senha",
        html: message(userId, service, typeAction),
      })
      .then((res) => {
        console.log("email enviado com sucesso", res);
      })
      .catch((error) => {
        console.log("falha ao enviar o email", error);
      });
  }
}

export default EmailService;
