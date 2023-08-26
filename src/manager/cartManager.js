import fs from 'fs';
import { ProductManager } from './productManager.js';

const productManager = new ProductManager("/products.json")

export class CartManager{
    constructor(path){
        this.dirName = './src/fileSystem'
        this.fileName = this.dirName + path   
        this.fs = fs
    }
    createFileCart = async()=>{
        try {
            if(!this.fs.existsSync(this.fileName)){
                await this.fs.promises.mkdir(this.dirName, {recursive: true})
                await this.fs.promises.writeFile(this.fileName, "[]")
            }
        } catch (error) {
            throw Error `El archivo ya se encuentra creado ${error}`
        }
    }
    getCart = async()=>{
        try {
            let readCart = await this.fs.promises.readFile(this.fileName, "utf-8")
            let readCartParse = JSON.parse(readCart)
            return readCartParse
        } catch (error) {
            console.log(`error get cart ${error}`);
        }
    }
    createCart = async()=>{
        try {
            let cartGet = await this.getCart();
            const lastProduct = cartGet[cartGet.length - 1];
            const newId = lastProduct ? lastProduct.id + 1 : 1;
            const cart = {
                id: newId,
                products: []
            }
            cartGet.push(cart)
            await this.fs.promises.writeFile(this.fileName, JSON.stringify(cartGet, null, 2))
        } catch (error) {
            console.log(`error en create cart ${error}`);
        }
    }
    addProductToCart = async(idCart, idProduct)=>{
        try {
            let docCartGet = await this.getCart()
            //obtener el carrito por id
            const searchCartById = docCartGet.find((cart => cart.id == idCart))
            //obtener el id del producto
            let findProd = await productManager.getProductById(idProduct)
            // buscar si el producto esta en el carrito
           
            const newProductToCart = {
                quantity: 1,
                productID: findProd.id
            }
            const productInCartFind = await searchCartById.products.find((p => p.productID === findProd.id))
            if(productInCartFind){
                productInCartFind.quantity++
                return await fs.promises.writeFile(this.fileName, JSON.stringify(docCartGet, null, 2))
            }
            searchCartById.products.push(newProductToCart)
            await fs.promises.writeFile(this.fileName, JSON.stringify(docCartGet, null, 2))
    
        } catch (error) {
            console.log(`error en add product to cart ${error}`);
        }
    }
    
    getCartById = async(id)=>{
        try {
            let docCartGet = await this.getCart()
            let findCartId = docCartGet.find((cart => cart.id == id))
            if (findCartId) {                                                                             
                return findCartId
            } else {
                throw Error ("El id del cart recibido no coincide")
            }
        } catch (error) {
            console.log(`error en getCartById ${error}`);
        }
    }
}

