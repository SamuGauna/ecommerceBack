import { cartModel } from "./models/cartModel.js";
import { productModel } from "./models/productModel.js";
import ProductManagerMongodb from "./productManagerMongodb.js";
const productManager = new ProductManagerMongodb();

export default class CartsDaoMongo {
    async getAllCart() {
        try {
        const response = await cartModel.find({}).populate('product.product');
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
            "product.product"
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
                (product) => product.product.toString() === pid
            );
            if (!productExist) {
                const newProd = {
                quantity: 1,
                product: findProduct._id,
                };
                findCart.product.push(newProd);
            } else {
                const indexProduct = findCart.products.findIndex(
                (elemento) => elemento.product.toString() === pid
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
            (product) => product.product.toString() === pid
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

    async deleteProductFromCart(cid, pid) {
        try {
        const findCart = await cartModel.findById(cid);

        if (findCart) {
            const productIndex = findCart.products.findIndex(
            (product) => product.product.toString() === pid
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
    }