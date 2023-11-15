import { Router } from "express";
import bcrypt from "bcrypt";
import userRepository from "../persistence/repository/userRepository.js";
import passport from "passport";
import jwt from "jsonwebtoken"
import config from "../config/dotenvConfig.js"
import userDto from "../persistence/dtos/userDto.js";

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
        res.redirect('/api/sessions/current')
        
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
    res.redirect('/api/sessions/profile')
});





export default router