import passport from "passport";
import LocalStrategy from "passport-local"
import GithubStrategy from "passport-github2"
import bcrypt from "bcrypt"
import userDao from "../daos/mongodb/userDao.js";
import jwt from "passport-jwt"

const userManager = new userDao();
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const cookieExtractor = (req)=>{
    let token = null
    if(req && req.cookies){
        token = req.cookies['token']
    }
    return token
}

export const initializePassport = ()=>{
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email'}, async(req, username, password, done)=>{
        const {firstName, lastName, age} = req.body
        try {
            const exist = await userManager.userExist(username)
            if(exist){
                return(null, false)
            }
            const newUser = await userManager.userCreate(firstName, lastName, username, age, password)
            return done(null, newUser)
        } catch (error) {
            return done(error)
        }
    }))
    passport.use('login', new LocalStrategy({ usernameField: 'email'}, async(username, password, done)=>{
        
        try {
            const existUser = await userManager.userExist(username)
            if(!existUser){
                return(null, false)
            }
            if(!bcrypt.compareSync(password, existUser.password)){
                return done(null, false)
            }
            return done(null, existUser)

        } catch (error) {
            return done(error)
        }
    }))
    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.2f26fb4a6aa1bc1b',
        clientSecret: 'd989e4c1acfe1db5e5b0622a79fcf33055c21c72',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
        scope: ['user:email']
    }, async(accessToken, refreshToken, profile, done)=>{
        try {
            const email = profile.emails[0].value
            const user = await userManager.userExist(email)
            if(!user){
                console.log(profile);
                const newUser = await userManager.userCreate(profile._json.login,
                    "lastName", 
                    email, 
                    23, 
                    "123xd"
                    )
            return done(null, newUser)
            }
            return done(null, user)
        } catch (error) {
            done(error)
        }
        
    }
    ))
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_TOKEN_SECRET,
    },async(jwt_payload, done)=>{
        try {
            done(null, jwt_payload)
        } catch (error) {
            done(error)
        }
    })
    )
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async(id, done)=>{
        const user = await userManager.findUser(id);
        done(null, user)
    })

}