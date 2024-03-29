import passport from "passport";
import LocalStrategy from "passport-local"
import GithubStrategy from "passport-github2"
import bcrypt from "bcrypt"
import jwt from "passport-jwt"
import config from "../config/dotenvConfig.js"
import { convertToUserDto } from "../persistence/dtos/userDto.js";
import { user } from "../services/dependencys/injection.js";

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies && req.cookies['token']) {
        token = req.cookies['token'];
    }
    if (!token && req && req.cookies && req.cookies['tokenPassword']) {
        token = req.cookies['tokenPassword'];
    }
    return token;
};

export const initializePassport = ()=>{
    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email'}, async(req, username, password, done)=>{
        const {firstName, lastName, age} = req.body
        try {
            const exist = await user.userExist(username)
            if(exist){
                return(null, false)
            }
            const newUser = await user.userCreate(firstName, lastName, username, age, password)
            return done(null, newUser)
        } catch (error) {
            return done(error)
        }
    }))
    passport.use('login', new LocalStrategy({ usernameField: 'email'}, async(username, password, done)=>{
        
        try {
            const existUser = await user.userExist(username)
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
        callbackURL: 'http://localhost:8080/api/users+/githubcallback',
        scope: ['user:email']
    }, async(accessToken, refreshToken, profile, done)=>{
        try {
            const email = profile.emails[0].value
            const user = await user.userExist(email)
            if(!user){
                console.log(profile);
                const newUser = await user.userCreate(profile._json.login,
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
            const userfind = await user.findUser(jwt_payload.userId);
            const dtoUser = convertToUserDto(userfind)
            done(null, dtoUser)
        } catch (error) {
            done(error)
        }
    })
    )
    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })
    passport.deserializeUser(async(id, done)=>{
        const user = await user.findUser(id);
        done(null, user)
    })

}