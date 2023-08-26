import express from "express";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js" 

import { ProductManager } from "./manager/productManager.js";




const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/products', productRouter)
app.use('/carts', cartRouter)



const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})



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