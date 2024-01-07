import { cartModel } from "../daos/mongodb/models/cartModel.js";
import { productModel } from "../daos/mongodb/models/productModel.js";
import ProductRepository from "./productRepository.js";
const pRepository= new ProductRepository();

export default class CartRepository {
    async getAllCart() {
        try {
        const response = await cartModel.find({}).populate('products.productId');
        return response;
        } catch (error) {
        console.log(error);
        }
    }

    async createCart(obj) {
        try {
        const response = await cartModel.create(obj);
        return response;
        } catch (error) {
        console.log(error);
        }
    }

    async getCartById(cid) {
        try {
        const response = await cartModel.findById(cid).populate(
            "products.productId"
        );
        return response;
        } catch (error) {
        console.log(error);
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
            return findCart;
            } else {
            throw new Error("The cart you are searching for does not exist!");
            }
        }
        } catch (error) {
        console.log(error);
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

        return cart;
        } catch (error) {
        console.log(error);
        }
    }

    async updateAllCart(cid, obj) {
        try {
            const response = await cartModel.updateOne({_id: cid}, obj);
            return response;
        } catch (error) {
        console.log(error);
        }
    }

    async deleteProductFromCart(cid, pid) {
        try {
        const findCart = await cartModel.findById(cid);

        if (findCart) {
            const productIndex = findCart.products.findIndex(
            (product) => product.productId ? product.productId.toString() === pid : false
            );
            if (productIndex !== -1) {
            findCart.products.splice(productIndex, 1);
            await findCart.save();
            return findCart;
            } else {
            throw new Error(
                "The product you are searching for does not exist in the cart!"
            );
            }
        } else {
            throw new Error("The cart you are searching for does not exist!");
        }
        } catch (error) {
        console.log(error);
        }
    }

    async deleteProductToCart(cid) {
        try {
        const findCart = await cartModel.findById(cid);
        if (findCart) {
            findCart.products = [];
            await findCart.save();
            return findCart;
        } else {
            throw new Error("The cart you are searching for does not exist!");
        }
        } catch (error) {
        console.log(error);
        }
    }
    async deleteCart(id) {
        try {
            const response = await cartModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    
}