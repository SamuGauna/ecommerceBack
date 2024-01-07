import { Router } from "express";
import bcrypt from "bcrypt";
import userRepository from "../persistence/repository/userRepository.js";
import passport from "passport";
import jwt from "jsonwebtoken"
import config from "../config/dotenvConfig.js"
import userDto from "../persistence/dtos/userDto.js";
import { logger } from "../utils/loggers.js";
import { createHash } from "../utils/bcrypt.js";
import { roleValidationMiddleware } from "../middlewares/role.js";

const user = new userRepository();
const router = Router();

router.get('/', async(req, res)=>{
    req.session.isLogged = true
    res.render('home', {style: 'homestyle.css'})
})
router.get('/login', async(req, res)=>{
    res.render('login', {style: 'homestyle.css'})
})
router.post('/login',passport.authenticate('login', {failureRedirect: '/login'}), async(req, res)=>{
    const userjwt = new userDto(req.user)
    const userId = userjwt.user_id
    const token = jwt.sign({userId}, config.JWT_TOKEN_SECRET, {expiresIn: '24h'})
    res.cookie('token', token, {
        maxAge: 100000,
        httpOnly: true
    })
    res.redirect('/api/users/current')
    }
)
router.get('/current', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    const userDto = req.user
    res.render('profile', {userDto})
})



router.post('/signup', passport.authenticate('register', {failureRedirect: '/failRegister'}), async(req, res) => {
    res.redirect('login')
});
router.get('/profile', (req, res) => {
    console.log(req.user);
    const firstname = req.session.firstName
    const userSession = {
        firstName: req.session.firstName,
        role: req.session.role,
        isLogged: req.session.isLogged
    }
    res.render('profile', {}) 
});
router.get('/github',  passport.authenticate('github', {scope: ['user:email']}), async(req, res) => {
    
});
router.get('/githubcallback',  passport.authenticate('github', {failureRedirect: '/login'}), async(req, res) => {
        req.session.firstName = req.user.firstName
        req.session.lastName = req.user.lastName
        req.session.email = req.user.email
        req.session.age = req.user.age
        req.session.role = req.user.role
        req.session.isLogged = true
    res.redirect('/api/users/profile')
});

router.get('/passRecovery', async(req, res)=>{
    res.render('forgotPassword', {style: 'homestyle.css'})
})
router.get('/passChange', async(req, res)=>{
    
        res.render('passwordChange', {style: 'homestyle.css'})
    
})
router.put('/updatePass', passport.authenticate('jwt', {session: false}), async(req, res) => {
    const { newPassword, newPasswordConfirm } = req.body;
    if (newPassword !== newPasswordConfirm) {
        return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }
        try {
            await user.updatePassword(req.user.user_id, createHash(newPassword));
            logger.info("Contraseña actualizada");
            res.json({ success: true });
        } catch (error) {
            logger.error(error);
            res.status(500).send({ error: 'Hubo un error al actualizar la contraseña' });
        }
});
router.get('/premiumUsers',passport.authenticate('jwt', {session: false}), roleValidationMiddleware, async(req, res)=>{
    try {
        let allusers = await user.getAllUsers()
        let usersDtoArray = allusers.map(user => new userDto(user));
        res.render('premiumUsers', {usersDtoArray})
    } catch (error) {
        logger.error(error);
        res.status(500).send({ error: 'Hubo un error' });
    }
    
})
router.put('/premium/:uid',passport.authenticate('jwt', {session: false}), roleValidationMiddleware, async(req, res)=>{
    try {
        const { uid } = req.params
        const userupdate = await user.addPremiumUser(uid)
        const userdto = new userDto(userupdate)
        res.json(userdto)
    } catch (error) {
        logger.error(error);
        res.status(500).send({ error: 'Hubo un error al actualizar el rol' });
    }
    
})







export default router