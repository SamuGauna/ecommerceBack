import express from "express";
import { ProductManager } from "./productManager.js";

const productManager = new ProductManager("/products.json");
// const test = async ()=>{
//     await productManager.createFile();
//     await productManager.addProduct("Escoba", "SemiNueva", 100, "urlCualquiera", "1sas210", 5)
//     await productManager.addProduct("Martillo", "Nuevo", 250, "urlCualquiera", "1sas450", 10)
//     await productManager.addProduct("Secador", "Usado", 350, "urlCualquiera", "1sa454110", 7)
//     await productManager.addProduct("Casaca de Boca", "Impecable", 35000, "SeVieneLaSeptimaURL", "1s20sa5s210", 7)
// }
// test();


// endpoints
//consulta por products
// localhost:8080/products
// con req Query
// localhost:8080/products?limit=1
// con req Params
// localhost:8080/products/2



const app = express();

app.use(express.urlencoded({extended:true}))
app.use(express.json())



const PORT = 8080
app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})
app.get('/products', async(req, res) =>{
    const {limit} = req.query
    const readproduct = await productManager.getProducts();
    // let objectJS = JSON.parse(readproduct)
    if(limit){
        const limitProduct = await readproduct.splice(0, parseInt(limit))
        res.send(limitProduct)
    } else{
        res.send(readproduct)
    }

})
app.get('/products/:pid', async(req, res) =>{
    const {pid} = req.params
    const readproduct = await productManager.getProducts();
    const searchProduct = readproduct.find((prod)=> prod.id === parseInt(pid))
    if(searchProduct){
        res.send(searchProduct)
    } else{
        res.json("ID INGRESADO NO EXISTE")
    }
})


app.get('/dosparametros/:nombre/:apellido', (req, res)=>{
    // nombre y apellido se encuentran dentro del objeto req.params
    res.send(`el nombre es ${req.params.nombre} y el apellido ${req.params.apellido}`)
})

