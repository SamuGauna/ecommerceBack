import { Router } from "express";
import { 
    getAllController, 
    getByIdController, 
    createController, 
    updateController, 
    deleteController,
    getProdFilterPaginateController
} from "../controllers/productController.js";

const router = Router();

router.get('/', getProdFilterPaginateController)
router.get('/:id', getByIdController)
router.post('/', createController)
router.put('/:id', updateController)
router.delete('/:id', deleteController)

export default router;
