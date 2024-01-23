
import { logger } from "../../utils/loggers.js";
import { productModel } from "../daos/mongodb/models/productModel.js";
export default class productRepository {
    async getAllProducts() {
        try {
            const response = await productModel.find({});
            logger.info('Successful query on getAllProducts');
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
    async getProdFilterPaginate(modelTypeElement, modelLimit, modelPage, modelSort) {
        try {
            const products = await productModel.paginate(modelTypeElement, {
                limit: modelLimit, 
                page: modelPage,
                sort: modelSort,
                lean: true
            });
            logger.info('Successful query on getProdFilterPaginate');
            return products
        } catch (error) {
            throw new Error(error);
        }
    }
    async getProductById(id) {
        try {
            const response = await productModel.findById(id);
            logger.info('Successful query on getProductById');
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
    async createProduct(obj) {
        try {
            const response = await productModel.create(obj);
            logger.info('Successful on createProduct');
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateProduct(id, obj) {
        try {
            await productModel.updateOne({_id: id}, obj);
            logger.info('Successful on updateProduct');
            return obj;
        } catch (error) {
            throw new Error(error);
        }
    }
    async deleteProduct(id) {
        try {
            const response = await productModel.findByIdAndDelete(id);
            logger.info('Successful on deleteProduct');
            return response;
        } catch (error) {
            throw new Error(error);
        }
    }
}