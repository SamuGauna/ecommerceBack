import CartRepository from "../../persistence/repository/cartRepository.js";

const cartManager = new CartRepository();

export const getCartsAllService = async () => {
    try {
        const docs = await cartManager.getAllCart();
        return docs;
    } catch (error) {
        console.log(error);
    }
};

export const getCartByIdService = async (cid) => {
    try {
        const doc = await cartManager.getCartById(cid);
      //const doc = await cartsManager.getCartById(Number(cid));
    if (!doc)
        return `The cart you are searching width ID ${cid} could not be found!`;
    else return doc;
    } catch (error) {
        console.log(error);
    }
};
export const createCartService = async () =>{
    try {
        const doc = await cartManager.createCart();
        return doc;
    } catch (error) {
        console.log(error);
    }
};

export const addProductToCartService = async (cid, pid) =>{
    try {
        const doc = await cartManager.addProductToCart(cid, pid);
          //const doc = await cartsManager.addProductToCart(Number(cid), Number(pid));
        return doc;
    } catch (error) {
        console.log(error);
    }
}

export const updateProductQuantityService = async(cid, pid, quantity) => {
    try {
        const doc = await cartManager.updateProductQuantity(cid, pid, quantity);
        return doc;
    } catch (error) {
        console.log(error);
    }
}
export const updateAllCartService = async(cid, obj) => {
    try {
        const existCart = await cartManager.getCartById(cid)
        if(!existCart){
            throw new Error('cart not found')
        } else {
            const doc = await cartManager.updateAllCart(cid, obj);
            return doc;
        }
        
    } catch (error) {
        console.log(error);
    }
}


export const deleteProductToCartService = async (cid) => {
    try {
        const doc = await cartManager.deleteProductToCart(cid);
      //const doc = await cartsManager.deleteProductToCart(Number(cid));
        return doc;
    } catch (error) {
    console.log(error);
    }
};


export const deleteProductFromCartService = async (cid, pid) => {
    try {
        const doc = await cartManager.deleteProductFromCart(cid, pid);
      //const doc = await cartsManager.deleteProductFromCart(Number(cid), Number(pid));
    return doc;
    } catch (error) {
        console.log(error);
    }
};