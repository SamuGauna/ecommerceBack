import MongoStore from 'connect-mongo'
import session from 'express-session'
export const sessionMongoStore = session({
    store: MongoStore.create({
        mongoUrl: process.env.DB_MONGO_URL
    }),
    secret: process.env.SESSION_MONGO_STORE_SECRET,
    resave: false,
    saveUninitialized: false
})