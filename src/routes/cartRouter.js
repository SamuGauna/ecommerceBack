import { Router } from "express";
import { CartManager } from "../manager/cartManager.js";
const router = Router();

const cart = new CartManager("/cart.json")
cart.createFileCart()


router.post('/carts', async(req, res) =>{
    try {
        await cart.createCart()
        res.status(200).send({ status: "Success", message: "Carrito creado con éxito!" })
    } catch (error) {
        res.status(404).json({message:error.message})
    }
})
router.get('/carts/:cid', async(req, res) =>{
    try {
        const {cid} = req.params
        const cartById = await cart.getCartById(parseInt(cid))
        if(!cartById){
            return res.status(404).json({message:'Cart not found'})
        }
        return res.status(200).json(cartById)
    } catch (error) {
        res.status(404).json({message:error.message})
    }
})
router.post('/carts/:cid/product/:pid', async(req, res) =>{
    try {
        const {cid, pid} = req.params
        await cart.addProductToCart(parseInt(cid), parseInt(pid))
        res.status(201).send({mensaje: "Producto agregado con éxito!"}); 
    } catch (error) {
        console.log(error)
        return res.status(202).send({ status: "ERROR", error: error })
    }
})






export default router