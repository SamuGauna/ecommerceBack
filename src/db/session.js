import MongoStore from 'connect-mongo'
import session from 'express-session'
export const sessionMongoStore = session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://admin78:Martina102509.@cluster0.toskn6p.mongodb.net/ecommerce?retryWrites=true&w=majority'
    }),
    secret: 'sdas512sd12',
    resave: false,
    saveUninitialized: false
})