import { logger } from "../utils/loggers.js";
import { createProductFaker } from "../services/faker.js";
import { prodRepository } from "../services/dependencys/injection.js";
import { httpRes } from "../services/dependencys/injection.js";
export const getAllController = async (req, res, next) => {
    try {
        const doc = await prodRepository.getAllProducts();
        if (doc.length === 0) {
            return httpRes.NotFound(res, { doc });
        } else {
            return httpRes.Ok(res, { doc });
        }
    } catch (error) {
        return httpRes.HandleError(res, error);
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
        const products = await prodRepository.getProdFilterPaginate(modelTypeElement, modelLimit, modelPage, modelSort);
        const cart = await prodRepository.getProductById("6513322471de1bde07ea5d2d")
        let totalQuantity = 0;
        if (Array.isArray(cart.products)) {
            cart.products.forEach(product => {
            totalQuantity += product.quantity;
            });
        }
        let payload = products.docs
        return httpRes.OkPaginate(res, { payload }, products)
    } catch (error) {
        return httpRes.HandleError(res, error);
    }
}
export const getByIdController = async (req, res, next) => {
    try {
        const {id} = req.params;
        const doc = await prodRepository.getProductById(id);
        if (!doc) {
        return httpRes.NotFound(res, { doc });
        }
        return httpRes.Ok(res, { doc });
    } catch (error) {
        return httpRes.HandleError(res, error);
    }
}
export const createController = async (req, res, next) => {
    try {
        const {title, description, price,thumbnail, code, stock, status} = req.body;
        const newDoc = await prodRepository.createProduct({
            title, 
            description,
            price,
            thumbnail,
            code,
            stock,
            status
        })
        if (!newDoc) {
            return httpRes.NotFound(res, { newDoc });
            }
            return httpRes.Ok(res, { newDoc });
    } catch (error) {
        return httpRes.HandleError(res, error);
    }
}
export const updateController = async (req, res, next) => {
    try {
        // const existDoc = await prodRepository.getProductById(id)
        // if(!existDoc){
        //     throw new Error('product not found')
        // } else {
        //     const prodUpd = await prodRepository.updateProduct(id,obj)
        //     return prodUpd;
        // }
        const {id} = req.params;
        const {title, description, price, thumbnail, code, stock, status} = req.body
        const existProd = await prodRepository.getProductById(id);
        if(!existProd){
            return httpRes.NotFound(res, { existProd });
            } else {
                const docUpd = await prodRepository.updateProduct(id, {
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                    status
                })
                return httpRes.Ok(res, { docUpd });
            }
    } catch (error) {
        return httpRes.HandleError(res, error);
    }
}
export const deleteController = async (req, res, next) => {
    try {
        const {id} = req.params;
        const prodDelete = await prodRepository.deleteProduct(id);
        if (!prodDelete) {
            return httpRes.NotFound(res, { prodDelete });
            }
        return httpRes.Ok(res, { prodDelete });
    } catch (error) {
        return httpRes.HandleError(res, error);
    }
}
export const createFakerProductsController = async (req, res) => {
    try {
        const {fakerQuantity} = req.query
        const response = await createProductFaker(fakerQuantity)
        if(!response){
            return httpRes.NotFound(res, { response })
        }
        return httpRes.Ok(res, { response })
    } catch (error) {
        logger.error(`Error en createFakerProductsController`);
        return httpRes.HandleError(res, error);
    }
}