import MongoStore from 'connect-mongo'
import session from 'express-session'
import dotenvConfig from '../../../../config/dotenvConfig.js'
export const sessionMongoStore = session({
    store: MongoStore.create({
        mongoUrl: dotenvConfig.DB_MONGO_URL
    }),
    secret: dotenvConfig.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
})