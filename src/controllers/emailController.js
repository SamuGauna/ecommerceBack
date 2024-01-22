import { transporter, mailEtherealMessage, transporter2, gmailMessage } from "../services/email/emailService.js";
import { logger } from "../utils/loggers.js";
import passport from "passport";
import jwt from "jsonwebtoken"
import userRepository from "../persistence/repository/userRepository.js";
import { convertToUserDto } from "../persistence/dtos/userDto.js";
import config from "../config/dotenvConfig.js"
const userManager = new userRepository()
export const sendMailEthereal = async(req, res)=>{
    try {
        const {email} = req.body
        mailEtherealMessage.to = email
        const response = await transporter.sendMail(mailEtherealMessage)
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}
export const sendGmail = async(req, res)=>{
    try {
        const {email} = req.body
        const existUser = await userManager.userExist(email)
        if (!existUser) {
            return res.status(404).json({ error: 'El usuario no existe' });
        }
        if(existUser){
            const userdto = convertToUserDto(existUser)
            const userId = userdto.user_id
            const token = jwt.sign({userId}, config.JWT_TOKEN_SECRET, {expiresIn: '1h'})
            res.cookie('tokenPassword', token, {
            maxAge: 100000,
            httpOnly: true,
            path: '/'
            })
            gmailMessage.to = email
            const response = await transporter2.sendMail(gmailMessage)
            res.json(`Te llegara un mail a ${response.accepted}`)
        }
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
}