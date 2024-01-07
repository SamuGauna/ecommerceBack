import productRepository from "../../../persistence/repository/productRepository.js";
import assertNode from 'assert'
import { expect, assert, should } from "chai";
import mongoose from "mongoose";
import dotenvConfig from "../../../config/dotenvConfig.js";
import { logger } from "../../../utils/loggers.js";



describe('Test unitarios de product repository', ()=>{
    let productTest;
    let productCreated;
    before(async function(){
        this.timeout(10000); 
        try {
            await mongoose.connect(dotenvConfig.DB_MONGO_URL);
            logger.info('Conexión a la base de datos exitosa.')
            productTest = new productRepository();
            const newProdTest = {
                title: "title product test",
                description: "Nuevo",
                price: 250,
                thumbnail: "url cualquiera",
                code: "sdsd415",
                stock: 1,
                status: true
            }
            productCreated = await productTest.createProduct(newProdTest)
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
        if (productCreated) {
            const idProd = productCreated._id;
            const productDelete = await productTest.deleteProduct(idProd);
            logger.info("producto de prueba eliminado");
        }
        await mongoose.connection.close();
        logger.info("db disconnected - closed");
    });
    it('Deberia retornar un array de productos', async function() {
        this.timeout(5000)
        const listProducts = await productTest.getAllProducts();
        expect(Array.isArray(listProducts)).to.be.equal(true)
    })
    it('Deberia crear un producto', async function() {
        assert.strictEqual(productCreated.title, "title product test")
        assertNode.ok(productCreated)
    })
    it('Deberia obtener un producto por ID', async function() {
        const idProd = productCreated._id
        const productById = await productTest.getProductById(idProd)
        expect(productById.title).to.equal(productCreated.title);
        expect(productById.description).to.equal(productCreated.description);
        expect(productById.price).to.equal(productCreated.price);
    })
})