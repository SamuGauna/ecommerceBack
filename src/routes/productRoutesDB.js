import { Router } from "express";
import { 
    getAllController, 
    getByIdController, 
    createController, 
    updateController, 
    deleteController,
    getProdFilterPaginateController,
    createFakerProductsController
} from "../controllers/productController.js";


const router = Router();
router.get('/allProducts', getAllController)
router.get('/mockingproducts', createFakerProductsController)
router.get('/', getProdFilterPaginateController)
router.get('/:id', getByIdController)
router.post('/', createController)
router.put('/:id', updateController)
router.delete('/:id', deleteController)





export default router;
