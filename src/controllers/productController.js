import { getCartByIdService } from "../managers/db/cartManager.js";
import { 
    getAllService, 
    getByIdService, 
    createService, 
    updateService, 
    deleteService, 
    getProdFilterPaginateService,
    createProductFaker
} from "../managers/db/productManager.js";
import { logger } from "../utils/loggers.js";

export const getAllController = async (req, res, next) => {
    try {
        const doc = await getAllService();
        res.status(200).send({status: "success",message: "Get all products",payload: doc });
    } catch (error) {
        logger.warn('getAllController')
        logger.error(error)
    }
}
export const getProdFilterPaginateController = async (req, res, next) => {
    try {
        const { limit, page, sort, query } = req.query;
        const sortObjectMapper = {
            asc: { price: 1 },
            desc: { price: -1 },
        };
        const modelTypeElement = query ? JSON.parse(query) : {};
        const modelLimit = limit ? parseInt(limit, 10) : 10;
        const modelPage = page ? parseInt(page, 10) : 1;
        const modelSort = sortObjectMapper[sort] ?? undefined;
        const products = await getProdFilterPaginateService(modelTypeElement, modelLimit, modelPage, modelSort);
        const cart = await getCartByIdService("6513322471de1bde07ea5d2d")
        let totalQuantity = 0;
        if (Array.isArray(cart.products)) {
            cart.products.forEach(product => {
            totalQuantity += product.quantity;
            });
        }
        //res.render('productsDB', {products: doc.payload, quantityProdId: totalQuantity});
        res.status(200).send({
            status: "success", 
            payload: products.docs, 
            totalDocs: products.totalDocs,
            limit: products.limit,
            totalPages: products.totalPages,
            page: products.page,
            pagingCounter: products.pagingCounter,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage
        })
    } catch (error) {
        next(error)
    }
}
export const getByIdController = async (req, res, next) => {
    try {
        const {id} = req.params;
        const doc = await getByIdService(id);
        res.status(200).send({status: "success",message: "Product found",payload: doc });
    } catch (error) {
        console.log(`error en getbyidcontroller ${error}`)
    }
}
export const createController = async (req, res, next) => {
    try {
        const {title, description, price,thumbnail, code, stock, status} = req.body;
        const newDoc = await createService({
            title, 
            description,
            price,
            thumbnail,
            code,
            stock,
            status
        })
        res.status(200).send({status: "success",message: "Product create successfully",payload: newDoc });
    } catch (error) {
        next(error)
    }
}
export const updateController = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {title, description, price, thumbnail, code, stock, status} = req.body
        await getByIdService(id);
        const docUpd = await updateService(id, {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status
        })
        res.status(200).send({status: "success",message: "Product update successfully",payload: docUpd });
    } catch (error) {
        next(error)
    }
}
export const deleteController = async (req, res, next) => {
    try {
        const {id} = req.params;
        const prodDelete = await deleteService(id);
        res.status(200).send({status: "success",message: "Product deleted successfully",payload: prodDelete });
    } catch (error) {
        next(error)
    }
}
export const createFakerProductsController = async (req, res) => {
    try {
        const {fakerQuantity} = req.query
        const response = await createProductFaker(fakerQuantity)
        res.status(200).send({status: "success",message: "Faker products create successfully",payload: response });
    } catch (error) {
        console.error(`Error en createFakerProductsController: ${error}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
