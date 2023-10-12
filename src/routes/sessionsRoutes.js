import { Router } from "express";
import bcrypt from "bcrypt";
import userDao from "../daos/mongodb/userDao.js";
import passport from "passport";
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
        req.session.firstName = req.user.firstName
        req.session.lastName = req.user.lastName
        req.session.email = req.user.email
        req.session.age = req.user.age
        req.session.role = req.user.role
        req.session.isLogged = true
        return res.redirect('/api/sessions/profile')
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



export default router