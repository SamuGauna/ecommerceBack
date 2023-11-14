import { transporter, mailEtherealMessage, transporter2, gmailMessage } from "../services/emailService.js";

export const sendMailEthereal = async(req, res)=>{
    try {
        const response = await transporter.sendMail(mailEtherealMessage)
        console.log('mail enviado');
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}
export const sendGmail = async(req, res)=>{
    try {
        const response = await transporter2.sendMail(gmailMessage)
        console.log('Gmail enviado');
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}