import passport from "passport";
import jwt from "jsonwebtoken"
import dotenvConfig from "../config/dotenvConfig.js";
import { convertToUserDto } from "../persistence/dtos/userDto.js"
import { user } from "../services/dependencys/injection.js";
import { createHash } from "../utils/bcrypt.js";
import { logger } from "../utils/loggers.js";


export const homePageController = async (req, res, next) => {
    try {
        res.render('home', {style: 'homestyle.css'})
    } catch (error) {
        logger.warn('homePageController')
        logger.error(error)
    }
}
export const loginPageController = async (req, res, next) => {
    try {
        res.render('login', {style: 'homestyle.css'})
    } catch (error) {
        logger.warn('loginPageController')
        logger.error(error)
    }
}
export const loginController = async (req, res, next) => {
    try {
        const userjwt = convertToUserDto(req.user)
        const userId = userjwt.user_id
        const token = jwt.sign({userId}, dotenvConfig.JWT_TOKEN_SECRET, {expiresIn: '24h'})
        res.cookie('token', token, {
            maxAge: 100000,
            httpOnly: true
        })
        res.redirect('/api/users/current')
    } catch (error) {
        logger.warn('loginController')
        logger.error(error)
    }
}
export const profilePageController = async (req, res, next) => {
    try {
        // if(req.session){
        //     const userSession = {
        //         firstName: req.session.firstName,
        //         role: req.session.role,
        //         isLogged: req.session.isLogged
        //     }
        //     res.render('profile', {userSession})
        // }
        const userDto = req.user
        res.render('profile', {userDto})
    } catch (error) {
        logger.warn('profilePageController')
        logger.error(error)
    }
}
export const forgotPasswordController = async (req, res, next) => {
    try {
        res.render('forgotPassword', {style: 'homestyle.css'})
    } catch (error) {
        logger.warn('forgotPasswordController')
        logger.error(error)
    }
}
export const passwordChangeController = async (req, res, next) => {
    try {
        res.render('passwordChange', {style: 'homestyle.css'})
    } catch (error) {
        logger.warn('passwordChangeController')
        logger.error(error)
    }
}
export const updatePassController = async (req, res, next) => {
    try {
        const { newPassword, newPasswordConfirm } = req.body;
        if (newPassword !== newPasswordConfirm) {
        return res.status(400).json({ error: 'Las contraseñas no coinciden' });
        }
        await user.updatePassword(req.user.user_id, createHash(newPassword));
        logger.info("Contraseña actualizada");
        res.json({ success: true });
    } catch (error) {
        logger.warn('updatePassController')
        logger.error(error);
        res.status(500).send({ error: 'Hubo un error al actualizar la contraseña' });
    }
}
export const getAllUsersToPremiumController = async (req, res, next) => {
    try {
        let allusers = await user.getAllUsers()
        let usersDtoArray = allusers.map(user => convertToUserDto(user));
        res.render('premiumUsers', {usersDtoArray})
    } catch (error) {
        logger.warn('getAllUsersToPremium')
        logger.error(error);
        res.status(500).send({ error: 'Hubo un error' });
    }
}
export const convertUserToPremiumController = async (req, res, next) => {
    try {
        const { uid } = req.params
        const userupdate = await user.addPremiumUser(uid)
        const userdto = new convertToUserDto(userupdate)
        res.json(userdto)
    } catch (error) {
        logger.warn('convertUserToPremiumController')
        logger.error(error);
        res.status(500).send({ error: 'Hubo un error al actualizar el rol' });
    }
}