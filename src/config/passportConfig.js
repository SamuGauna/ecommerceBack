import passport from "passport";
import LocalStrategy from "passport-local"
import GithubStrategy from "passport-github2"
import bcrypt from "bcrypt"
import userRepository from "../persistence/repository/userRepository.js";
import jwt from "passport-jwt"
import config from "../config/dotenvConfig.js"

const userManager = new userRepository();

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
        clientID: config.CLIENT_ID_GITHUB_STRATEGY,
        clientSecret: config.CLIENT_SECRET_GITHUB_STRATEGY,
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
        secretOrKey: config.JWT_TOKEN_SECRET,
    },async(jwt_payload, done)=>{
        try {
            const user = await userManager.findUser(jwt_payload.userId);
            done(null, user)
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