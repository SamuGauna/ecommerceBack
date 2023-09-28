import express from "express";
import productRouter from "./routes/productRoutesDB.js";
import cartRouter from "./routes/cartRoutesDB.js"
import handlebarsRouter from "./routes/handlebarsRoutes.js"
import handlebars from "express-handlebars";
import './db/connection.js'
import { Server, Socket } from "socket.io";
import { eventsFromSocket } from "./socket/indexSocket.js";

const app = express();
const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})
// const socketServer = new Server(app.listen(8081, ()=>{
//     console.log(`listening on port 8081 with socket server`);
// }))
// eventsFromSocket(socketServer)



app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use(express.static('./public'))


app.use('/handlebars', handlebarsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
