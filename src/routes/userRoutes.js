import { Router } from "express";
import { roleValidationMiddleware } from "../middlewares/role.js";
import { 
    loginController, 
    forgotPasswordController, 
    homePageController, 
    loginPageController,
    profilePageController,
    passwordChangeController,
    updatePassController,
    getAllUsersToPremiumController,
    convertUserToPremiumController
    } from "../controllers/userController.js";
import passport from "passport";

const router = Router();

router.get('/', homePageController);
router.get('/login', loginPageController)
router.post('/login',passport.authenticate('login', {failureRedirect: '/login'}), loginController)
router.get('/current', passport.authenticate('jwt', {session: false}), profilePageController)
router.post('/signup', passport.authenticate('register', {failureRedirect: '/failRegister'}), loginPageController);
router.get('/profile', profilePageController);
router.get('/github',  passport.authenticate('github', {scope: ['user:email']}), async(req, res) => {});
router.get('/githubcallback',  passport.authenticate('github', {failureRedirect: '/login'}), profilePageController);
router.get('/passRecovery', forgotPasswordController)
router.get('/passChange', passwordChangeController)
router.put('/updatePass', passport.authenticate('jwt', {session: false}), updatePassController);
router.get('/premiumUsers',passport.authenticate('jwt', {session: false}), roleValidationMiddleware, getAllUsersToPremiumController)
router.put('/premium/:uid',passport.authenticate('jwt', {session: false}), roleValidationMiddleware, convertUserToPremiumController)


export default router