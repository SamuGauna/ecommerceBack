
import express from "express";
import productRouter from "./routes/productRoutesDB.js";
import cartRouter from "./routes/cartRoutesDB.js"
import handlebarsRouter from "./routes/handlebarsRoutes.js"
import handlebars from "express-handlebars";
import './persistence/daos/mongodb/dbConfig/connection.js'
import { Server, Socket } from "socket.io";
import { eventsFromSocket } from "./socket/indexSocket.js";
import sessionRouter from './routes/sessionsRoutes.js'
import { sessionMongoStore } from "./persistence/daos/mongodb/dbConfig/session.js";
import { initializePassport } from "./config/passportConfig.js";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import swaggerUI  from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOpts } from "./docs/swaggerOpts.js";

import emailRouter from "./routes/emailRouter.js"
import { errorMiddleware } from "./middlewares/errorHandler.js";

import loggerRouter from "./routes/loggerRouter.js"
import { logger } from "./utils/loggers.js";


const app = express();
const PORT = 8080
app.listen(PORT, ()=>{
    logger.info(`listening on port ${PORT}`);
})
// const socketServer = new Server(app.listen(8081, ()=>{
//     console.log(`listening on port 8081 with socket server`);
// }))
// eventsFromSocket(socketServer)

const specs = swaggerJSDoc(swaggerOpts)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

const hbs = handlebars.create({
    helpers: {
    userAuthenticated: function (user) {
        if (user === 'admin') {
        return true;
        }
        return false;
    },
    log: function(something) {
        console.log(something);
    }
    },
});
initializePassport();
app.use(passport.initialize())
app.use(sessionMongoStore)
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(errorMiddleware);
app.use(helmet())
app.engine('handlebars', hbs.engine)

app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))



app.use('/handlebars', handlebarsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/users', sessionRouter)
app.use('/api/email', emailRouter)
app.use('/', loggerRouter)