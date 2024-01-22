import { cartRepository } from "../services/dependencys/injection.js";
import { httpRes } from "../services/dependencys/injection.js";
export const getCartsController = async (req, res, next) => {
    try {
        const docs = await cartRepository.getAllCart();
        if (docs.length === 0) {
            return httpRes.NotFound(res, { docs });
        } else {
            return httpRes.Ok(res, { docs });
        }
    } catch (error) {
        return httpRes.HandleError(res, error);
    }
}
export const getCartByIdController = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const docs = await cartRepository.getCartById(cid);
        if (!docs) {
            return httpRes.NotFound(res, { docs });
        }
        return httpRes.Ok(res, { docs });
    } catch (error) {
        return httpRes.HandleError(res, error);
    }
};
export const createCartController = async (req, res, next) => {
    try {
        const docs = await cartRepository.createCart();
        if (!docs) {
            return httpRes.NotFound(res, { docs });
        }
        return httpRes.Ok(res, { docs });
    } catch (error) {
        return httpRes.HandleError(res, error);
    }
};
export const addProductToCartController = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const product = await cartRepository.addProductToCart(cid, pid);
        if (product) {
            return httpRes.Ok(res, {  product  });
        } else {
            return httpRes.NotFound(res, { product });
        } 
    } catch (error) {
        return httpRes.HandleError(res, error);
    }
};
export const updateProductQuantityController = async (req,res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const updatedCart = await cartRepository.updateProductQuantity(cid, pid, quantity);
        if (!updatedCart) {
            return httpRes.NotFound(res, { updatedCart });
        }
        return httpRes.Ok(res, { updatedCart });
    } catch (error) {
        return httpRes.HandleError(res, error);
    }
}
export const updateAllCartController = async (req, res, next) => {
    try {
        const {cid} = req.params;
        const { quantity, productId } = req.body;
        const existCart = await cartRepository.getCartById(cid)
        if(!existCart){
            throw new Error('cart not found')
        } else {
            const cartUpd = await cartRepository.updateAllCart(cid, {products : [{
                quantity,
                productId
                }]
            })
            return res.status(200).json({
                message: "Cart updated successfully",
                payload: cartUpd,
            });
        }
    } catch (error) {
        next(error);
    }
}

export const deleteProductToCartController = async (req, res, next) => {
    try {
        const {cid} = req.params;
        const productsDeleted = await cartRepository.deleteProductToCart(cid); 
      //const productsDeleted = await deleteProductToCartService(Number(cid)); 
        if (productsDeleted ) {
            res.status(201).send({status: "success",message: "Product/s successfully deleted from cart!",payload: productsDeleted });
        } else {
        res.status(404).send({status: "error",mensaje:"The product or cart you are searching for could not be found!"});
        } 
    } catch (error) {
        next(error);
    }
}

export const deleteProductFromCartController = async (req, res, next) => {
    try {
        const {cid, pid} = req.params;
        const productDeleted = await cartRepository.deleteProductFromCart(cid, pid); 
        //const productDeleted = await deleteProductFromCartService(Number(cid), Number(pid)); 
        if (productDeleted ) {
        res.status(201).send({status: "success",message: "The product/s you have selected has/have been successfully deleted from cart!"});
        } else {
        res.status(404).send({status: "error",message:"The product or cart you are searching for could not be found!"});
        } 
    } catch (error) {
        next(error);
    }
}
export const buyComplete = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const {pid, quantity, user} = req.body
        const product = await getByIdService(pid);
        let productosNoProcesados = [];
        if(product.stock >= quantity){
            product.stock -= quantity
            await updateService(pid, {product})
            await addProductToCartService(cid,pid);
            await ticket.createTicket(72, user)
            res.json('Producto confirmado para su compra y ticket generado')
        }
        else {
        productosNoProcesados.push(pid);
        res.status(400).send({status: "error",mensaje:"No hay suficiente stock"});
        } 
        console.log(productosNoProcesados);
        return productosNoProcesados;
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al verificar el stock');
    }
}
