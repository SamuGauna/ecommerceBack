import { ProductManager } from "../daos/fileSystem/manager/productManager.js";

import { messagesModel } from "../daos/mongodb/models/messageModel.js";



export const eventsFromSocket = (socketServer)=>{
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
}
