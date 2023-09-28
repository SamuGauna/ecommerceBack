import { productModel } from "./models/productModel.js";


//aca se va a crear la clase de product manager de mongo 


export default class ProductManagerMongodb {
async getAllProducts() {
    try {
        const response = await productModel.find({});
        return response;
    } catch (error) {
        console.log(error);
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
        const response = {
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
        }
        return response
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