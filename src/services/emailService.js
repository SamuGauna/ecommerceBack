import { createTransport } from "nodemailer";
import config from "../config/dotenvConfig.js";


// las credenciales de ethereal se sacan de https://ethereal.email/
// con nuevas credenciales cambiar los campos de transporter(user & pass) y mailEtherealMessage(from & to)
export const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: config.PORT_NODEMAILER,
    auth: {
        user: 'ella.feeney@ethereal.email',
        pass: 'AJyEY5QhYZfmQ5NXS9'
    }
});
export const mailEtherealMessage = {
    from: "ella.feeney@ethereal.email",
    to: "ella.feeney@ethereal.email",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>"
}

// la direccion de destino se envia a un email temporal sacado de "https://tempail.com/"
export const transporter2 = createTransport({
    service: 'gmail',
    port: config.PORT_GMAIL,
    secure: true,
    auth: {
        user: config.NODEMAILER_USER_GMAIL,
        pass: config.NODEMAILER_PASSWORD_GMAIL
    }
});
export const gmailMessage = {
    from: config.NODEMAILER_USER_GMAIL,
    to: "lefyimeyda@gufum.com",
    subject: "Holanda",
    text: "Fuck of",
    html: "<p>HTML version of the message</p>"
}