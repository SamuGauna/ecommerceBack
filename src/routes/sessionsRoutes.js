import { Router } from "express";
import bcrypt from "bcrypt";
import userDao from "../daos/mongodb/userDao.js";
import passport from "passport";
import jwt from "jsonwebtoken"
const user = new userDao();
const router = Router();

router.get('/', async(req, res)=>{
    req.session.isLogged = true
    res.render('home', {style: 'homestyle.css'})
})
router.get('/login', async(req, res)=>{
    res.render('login', {style: 'homestyle.css'})
})
router.post('/login',passport.authenticate('login', {failureRedirect: '/login'}), async(req, res)=>{
        const {login_method, email} = req.body
        if(login_method === 'session'){
            req.session.firstName = req.user.firstName
            req.session.lastName = req.user.lastName
            req.session.email = req.user.email
            req.session.age = req.user.age
            req.session.role = req.user.role
            req.session.isLogged = true
            console.log('te logeaste con session');
            return res.redirect('/api/sessions/profile')
            
        }
        const userjwt = await user.userExist(email)
        const userId = userjwt._id
        const token = jwt.sign({userId}, process.env.JWT_TOKEN_SECRET, {expiresIn: '24h'})
        res.cookie('token', token, {
            maxAge: 100000,
            httpOnly: true
        })
        console.log('te logeaste con token');
        res.redirect('/api/sessions/current')
        
    }
    
)



router.post('/signup', passport.authenticate('register', {failureRedirect: '/failRegister'}), async(req, res) => {
    res.redirect('login')
});
router.get('/profile', (req, res) => {
    const firstname = req.session.firstName
    const userSession = {
        firstName: req.session.firstName,
        role: req.session.role,
        isLogged: req.session.isLogged
    }
    res.render('profile', {userSession}) 
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
router.get('/current', passport.authenticate('jwt', {session: false}), async(req, res)=>{
    res.send(req.user)
})




export default router