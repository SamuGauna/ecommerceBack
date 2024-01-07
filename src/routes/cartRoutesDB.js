import { Router } from "express";
import {
    getCartsController,
    getCartByIdController,
    createCartController,
    addProductToCartController,
    deleteProductToCartController,
    deleteProductFromCartController,
    updateProductQuantityController,
    updateAllCartController,
    buyComplete
} from "../controllers/cartController.js";

const router = Router();

router.get("/", getCartsController);
router.post("/", createCartController);
router.get("/:cid", getCartByIdController);
router.put("/:cid", updateAllCartController );
router.delete("/:cid", deleteProductToCartController);
router.post("/:cid/purchase", buyComplete)
router.post("/:cid/product/:pid", addProductToCartController);
router.put("/:cid/product/:pid", updateProductQuantityController );
router.delete("/:cid/product/:pid", deleteProductFromCartController);




export default router;