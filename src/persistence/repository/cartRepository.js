import { logger } from "../../utils/loggers.js";
import { cartModel } from "../daos/mongodb/models/cartModel.js";
import { productModel } from "../daos/mongodb/models/productModel.js";
export default class CartRepository {
    async getAllCart() {
        try {
            const response = await cartModel.find({}).populate('products.productId');
            logger.info('Successful query on getAllCart');
        return response;
        } catch (error) {
            throw new Error(error);
        }
    }
    async createCart(obj) {
        try {
            const response = await cartModel.create(obj);
            logger.info('Cart created successfully on createCart');
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getCartById(cid) {
        try {
            const response = await cartModel.findById(cid).populate("products.productId");
            logger.info('Successful query on getCartById');
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
    async addProductToCart(cid, pid) {
        try {
            const findCart = await cartModel.findById(cid);
            const findProduct = await productModel.findById(pid);
            if (!findProduct) {
                throw new Error(`The requested product id ${pid} doesnt exist!`);
            } else {
                if (findCart) {
                    const productExist = findCart.products.find(
                    (elemento) => elemento.productId ? elemento.productId.toString() === pid : false
                );
                if (!productExist) {
                    const newProd = {
                    quantity: 1,
                    productId: pid,
                    };
                    findCart.products.push(newProd);
                } else {
                    const indexProduct = findCart.products.findIndex(
                    (elemento) =>  elemento.productId ? elemento.productId.toString() === pid : false
                    );
                    findCart.products[indexProduct].quantity += 1;
                }
                await findCart.save();
                logger.info('add product to cart successfully on addProductToCart');
                return findCart;
                } else {
                    throw new Error("The cart doesnt exist!");
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = await cartModel.findById(cid);
            if (!cart) {
                throw new Error("Cart not found");
            }
            const productToUpdate = cart.products.find(
                (product) => product.productId ? product.productId.toString() === pid : false
            );
            if (!productToUpdate) {
                throw new Error("Product not found in cart");
            }
            productToUpdate.quantity = quantity;
            await cart.save();
            logger.info('quantity updated on updateProductQuantity');
            return cart;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateAllCart(cid, obj) {
        try {
            const response = await cartModel.updateOne({_id: cid}, obj);
            logger.info('cart updated on updateAllCart');
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteProductFromCart(cid, pid) {
        try {
            const findCart = await cartModel.findById(cid);
            if (findCart) {
                const productIndex = findCart.products.findIndex(
                (product) => product.productId ? product.productId.toString() === pid : false);
                if (productIndex !== -1) {
                    findCart.products.splice(productIndex, 1);
                    await findCart.save();
                    logger.info('product deleted on deleteProductFromCart');
                    return findCart;
                } else {
                    throw new Error("The product you are searching for doesnt exist in the cart!");
                }
            } else {
                throw new Error("The cart you are searching for doesnt exist!");
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteProductToCart(cid) {
        try {
            const findCart = await cartModel.findById(cid);
            if (findCart) {
                findCart.products = [];
                await findCart.save();
                logger.info('all products deleted on deleteProductToCart');
                return findCart;
            } else {
                throw new Error("The cart you are searching for doesnt exist!");
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteCart(id) {
        try {
            const response = await cartModel.findByIdAndDelete(id);
            logger.info('cart deleted on deleteCart');
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
}