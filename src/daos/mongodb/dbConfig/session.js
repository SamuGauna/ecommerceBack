import MongoStore from 'connect-mongo'
import session from 'express-session'
import config from "../../../config/dotenvConfig.js"
export const sessionMongoStore = session({
    store: MongoStore.create({
        mongoUrl: config.DB_MONGO_URL
    }),
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
})