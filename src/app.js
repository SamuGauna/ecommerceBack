import express from "express";
import productRouter from "./routes/productRoutesDB.js";
import cartRouter from "./routes/cartRoutesDB.js"
import handlebarsRouter from "./routes/handlebarsRoutes.js"
import handlebars from "express-handlebars";
import './db/connection.js'
import { Server, Socket } from "socket.io";
import { eventsFromSocket } from "./socket/indexSocket.js";
import sessionRouter from './routes/sessionsRoutes.js'
import { sessionMongoStore } from "./db/session.js";
import { initializePassport } from "./config/passportConfig.js";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";



const app = express();
const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})
// const socketServer = new Server(app.listen(8081, ()=>{
//     console.log(`listening on port 8081 with socket server`);
// }))
// eventsFromSocket(socketServer)

const hbs = handlebars.create({
    helpers: {
    userAuthenticated: function (user) {
        if (user === 'admin') {
        return true;
        }
        return false;
    },
    },
});
initializePassport();
app.use(passport.initialize())
app.use(sessionMongoStore)
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.engine('handlebars', hbs.engine)

app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))



app.use('/handlebars', handlebarsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/sessions', sessionRouter)
