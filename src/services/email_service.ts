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
        return res;
      })
      .catch((error) => {
        return error;
      });
  }
}

export default EmailService;
