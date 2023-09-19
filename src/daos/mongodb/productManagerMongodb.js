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