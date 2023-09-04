import { Router } from "express";
import { ProductManager } from "../manager/productManager.js";

const p = new ProductManager("/products.json");

const router = Router();

router.get('/', async(req, res) =>{
    const readproduct = await p.getProducts();
    
    res.render('home', { productos: readproduct, style: 'home.css' });

})
router.get('/realTimeProducts', async(req, res) =>{
    const readproduct = await p.getProducts();
    res.render('realTimeProducts', { style: 'realTimeProducts.css' })

})
export default router