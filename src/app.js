import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js" 
import handlebarsRouter from "./routes/handlebarsRouter.js"
import handlebars from "express-handlebars";
import { ProductManager } from "./manager/productManager.js";
import { Server, Socket } from "socket.io";
import './db/connection.js'
import { messagesModel } from "./daos/mongodb/models/messageModel.js";


const app = express();
const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})
const socketServer = new Server(app.listen(8081, ()=>{
    console.log(`listening on port 8081 with socket server`);
}))
socketServer.on('connection', (socket)=>{
    console.log(`se conecto un usuario de socket con id: ${socket.id}`);
    const product = new ProductManager("/products.json")
    socket.on('newProduct', async(productPost)=>{
        await product.addProduct(productPost.name, productPost.description, productPost.price, productPost.thumbnail, productPost.code, productPost.stock, productPost.status)
        const newProdFromSocket = await product.getProducts();
        socketServer.emit('updateStateProduct', newProdFromSocket);
    })
    socket.on('deleteProduct', async(idDelete)=>{
        const idToDelete = parseInt(idDelete.idDeleteFromSocketClient, 10);
        console.log(`info recibida del socket cliente`, idToDelete);
        await product.deleteProduct(idToDelete)
        const newListFromSocket = await product.getProducts();
        socketServer.emit('updateStateProduct2', newListFromSocket);
    })
    socket.on('message', async(dataMessage)=>{
        await messagesModel.create(dataMessage)
        const messagesDB = await messagesModel.find()
        socketServer.emit('newMessage', messagesDB)
    })
})

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')
app.use(express.static('./public'))


app.use('/handlebars', handlebarsRouter)
app.use('/api', productRouter)
app.use('/api', cartRouter)









app.get('/dosparametros/:nombre/:apellido', (req, res)=>{
    // nombre y apellido se encuentran dentro del objeto req.params
    res.send(`el nombre es ${req.params.nombre} y el apellido ${req.params.apellido}`)
})

// const productManager = new ProductManager("/products.json")

// const test = async ()=>{
//     await productManager.createFile();
//     await productManager.addProduct("Escoba", "SemiNueva", 100, "urlCualquiera", "1sas210", 5, true)
//     await productManager.addProduct("Martillo", "Nuevo", 250, "urlCualquiera", "1sas450", 10, true)
//     await productManager.addProduct("Secador", "Usado", 350, "urlCualquiera", "1sa454110", 7, true)
//     await productManager.addProduct("Casaca de Boca", "Impecable", 35000, "SeVieneLaSeptimaURL", "1s20sa5s210", 7, true)
// }
// test();