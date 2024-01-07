import CartRepository from "../../../persistence/repository/cartRepository.js";
import assertNode from 'assert'
import { expect, assert, should } from "chai";
import mongoose from "mongoose";
import dotenvConfig from "../../../config/dotenvConfig.js";
import { logger } from "../../../utils/loggers.js";

describe('Tests unitarios de cart repository', ()=>{
    let cartTest;
    let cartCreated;
    before(async function(){
        this.timeout(5000); 
        try {
            await mongoose.connect(dotenvConfig.DB_MONGO_URL);
            logger.info('Conexión a la base de datos exitosa.')
            cartTest = new CartRepository()
            cartCreated = await cartTest.createCart()
            logger.info(`carrito creado con id ${cartCreated._id}`)
        } catch (error) {
            logger.error('Error en la conexión a la base de datos:', error)
            throw error
        }
    })
    beforeEach(async function () {
        this.timeout(5000);
    });
    after(async function () {
        this.timeout(5000);
        if (cartCreated) {
            const idCart = cartCreated._id;
            const cartDelete = await cartTest.deleteCart(idCart);
            logger.info(`carrito eliminado con id ${cartCreated._id}`);
        }
        await mongoose.connection.close();
        logger.info("db disconnected - closed")
    });
    it('Deberia eliminar los productos del carrito', async function() {
        const idCart = cartCreated._id;
        const cart = await cartTest.deleteProductToCart(idCart);
        const arrayCart = cart.products
        assertNode.deepStrictEqual(arrayCart, [])
        expect(arrayCart).to.deep.equal([])
    })
    it('Deberia añadir un producto al carrito', async function() {
        const cartWithProd = await cartTest.addProductToCart(cartCreated._id, "65132aaa9d71b249f758be0b")
        assert.ok(cartWithProd);
        assert.ok(cartWithProd.products)
        expect(cartWithProd.products[0]).to.have.property('quantity');
        expect(cartWithProd.products[0].quantity).to.equal(1);
        expect(cartWithProd.products[0].productId.toString()).to.equal("65132aaa9d71b249f758be0b");
    })
    it('Deberia obtener un carrito por ID', async function() {
        const idCart = cartCreated._id
        const cartById = await cartTest.getCartById(idCart)
        expect(cartById._id.toString()).to.equal(cartCreated._id.toString());
    })
})