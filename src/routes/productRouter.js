import { Router } from "express";
import { ProductManager } from "../manager/productManager.js";
const router = Router();
const productManager = new ProductManager("/products.json")

router.get('/products', async(req, res) =>{
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
router.get('/products/:pid', async(req, res) =>{
    const {pid} = req.params
    const readproduct = await productManager.getProducts();
    const searchProduct = readproduct.find((prod)=> prod.id === parseInt(pid))
    if(searchProduct){
        res.send(searchProduct)
    } else{
        res.json("ID INGRESADO NO EXISTE")
    }
})
router.post('/products', async(req, res) =>{
    try {
        const {title, description, price, thumbnail, code, stock, status} = req.body
        const newProd = await productManager.addProduct(title, description, price, thumbnail, code, stock, status)
        res.json(newProd)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
router.put('/products/:pid', async(req, res) =>{
    try {
        const prod = req.body
        const {pid} = req.params
        const prodFind = await productManager.getProductById(parseInt(pid))
        if (prodFind) {
            await productManager.updateProduct(parseInt(pid), prod)
            res.send("Product updated successfully")
        } else{
            res.status(404).send('product not found');
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})
router.delete('/products/:pid', async(req, res)=>{
    try {
        const {pid} = req.params
        const allProducts = await productManager.getProducts()
        if (allProducts.length > 0) {
            await productManager.deleteProduct(parseInt(pid))
            res.send(`product with id: ${pid} deleted`)
        }else{
            res.send(`product with id: ${pid} not found`)
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})

export default router

