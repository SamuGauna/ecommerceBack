import { getCartByIdService } from "../services/cartService.js";
import { 
    getAllService, 
    getByIdService, 
    createService, 
    updateService, 
    deleteService, 
    getProdFilterPaginateService
} from "../services/productService.js";

export const getAllController = async (req, res, next) => {
    try {
        const doc = await getAllService();
        res.json(doc);
    } catch (error) {
        next(error)
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
        const doc = await getProdFilterPaginateService(modelTypeElement, modelLimit, modelPage, modelSort);
        const cart = await getCartByIdService("6513322471de1bde07ea5d2d")
        let totalQuantity = 0;
        if (Array.isArray(cart.products)) {
            cart.products.forEach(product => {
              totalQuantity += product.quantity;
            });
          }
        res.render('productsDB', {products: doc.payload, quantityProdId: totalQuantity});
        //res.json(doc)
    } catch (error) {
        next(error)
    }
}
export const getByIdController = async (req, res, next) => {
    try {
        const {id} = req.params;
        const doc = await getByIdService(id);
        res.json(doc)
    } catch (error) {
        next(error)
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
        res.json(newDoc)
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
        res.json(docUpd);
    } catch (error) {
        next(error)
    }
}
export const deleteController = async (req, res, next) => {
    try {
        const {id} = req.params;
        await deleteService(id);
        res.json({message:'product deleted successfully'})
    } catch (error) {
        next(error)
    }
}
