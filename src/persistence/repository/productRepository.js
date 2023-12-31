
import { logger } from "../../utils/loggers.js";
import { productModel } from "../daos/mongodb/models/productModel.js";


//aca se va a crear la clase de product manager de mongo 


export default class productRepository {
async getAllProducts() {
    try {
        const response = await productModel.find({});
        return response;
    } catch (error) {
        logger.warn('getAllRepository')
        logger.error(error)
        throw error; 
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
        return products
    } catch (error) {
        console.log(error);
    }
}

async getProductById(id) {
    try {
        const response = await productModel.findById(id);
        return response;
    } catch (error) {
        console.log(error);
    }
}
async createProduct(obj) {
    try {
        const response = await productModel.create(obj);
        return response;
    } catch (error) {
        console.log(error);
    }
}
async updateProduct(id, obj) {
    try {
        await productModel.updateOne({_id: id}, obj);
        return obj;
    } catch (error) {
        console.log(error);
    }
}
async deleteProduct(id) {
    try {
        const response = await productModel.findByIdAndDelete(id);
        return response;
    } catch (error) {
        console.log(error);
    }
}

}