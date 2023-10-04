import { Router } from "express";
import userDao from "../daos/mongodb/userDao.js";
const user = new userDao();
const router = Router();

router.get('/', async(req, res)=>{
    req.session.isLogged = true
    res.render('home', {style: 'homestyle.css'})
})
router.get('/login', async(req, res)=>{
    res.render('login', {style: 'homestyle.css'})
})
router.post('/login', async(req, res)=>{
    const {email, password} = req.body
    const userFind = await user.userExist(email, password)
    if(userFind){
        req.session.firstName = userFind.firstName
        req.session.lastName = userFind.lastName
        req.session.email = userFind.email
        req.session.age = userFind.age
        req.session.isLogged = true
        return res.redirect('/api/sessions/profile')
    }
    res.send('Los datos enviados no son correctos')
})



router.post('/signup', async(req, res) => {
    const {firstName, lastName, email, age, password } = req.body
    const newUser = await user.userCreate(firstName, lastName, email, age, password )
    if(newUser){
        req.session.firstName =  newUser.firstName
        req.session.lastName =  newUser.lastName
        req.session.email =  newUser.email
        req.session.age =  newUser.age
        req.session.role = newUser.role
        req.session.isLogged = true
        return res.redirect('/api/sessions/profile')
    }
    
    res.render('signup')
});
router.get('/profile', (req, res) => {
    const userSession = {
        firstName: req.session.firstName,
        role: req.session.role,
        isLogged: req.session.isLogged
    }
    res.render('profile', {userSession}) 
});


export default router