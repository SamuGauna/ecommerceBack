import productRepository from "../../persistence/repository/productRepository.js";
const prodDAOMongo = new productRepository()



export const getAllService = async()=>{
    try {
        const docs = await prodDAOMongo.getAllProducts();
        return docs;
    } catch (error) {
        console.log(error);
    }
};
export const getProdFilterPaginateService = async(modelTypeElement, modelLimit, modelPage, modelSort)=>{
    try {
        const docs = await prodDAOMongo.getProdFilterPaginate(modelTypeElement, modelLimit, modelPage, modelSort);
        return docs;
    } catch (error) {
        console.log(error);
    }
};

export const getByIdService = async(id)=>{
    try {
        const doc = await prodDAOMongo.getProductById(id);
        if(!doc){
            throw new Error('Product not found')
        } else return doc;
    } catch (error) {
        console.log(error);
    }
};
export const createService = async(obj)=>{
    try {
        const newProd = await prodDAOMongo.createProduct(obj)
        if(!newProd){
            throw new Error('Validation error')
        } else return newProd;
    } catch (error) {
        console.log(error);
    }
};
export const updateService = async(id, obj)=>{
    try {
        const existDoc = await prodDAOMongo.getProductById(id)
        if(!existDoc){
            throw new Error('product not found')
        } else {
            const prodUpd = await prodDAOMongo.updateProduct(id,obj)
            return prodUpd;
        }
    } catch (error) {
        console.log(error);
    }
};
export const deleteService = async(id)=>{
    try {
        const prodDel = await prodDAOMongo.deleteProduct(id)
        return prodDel;
    } catch (error) {
        console.log(error);
    }
};