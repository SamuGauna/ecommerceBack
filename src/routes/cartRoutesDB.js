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
} from "../controllers/cartController.js";

const router = Router();

router.get("/", getCartsController);
router.get("/:cid", getCartByIdController);
router.post("/", createCartController);
router.post("/:cid/product/:pid", addProductToCartController);
router.put("/:cid/product/:pid", updateProductQuantityController );
router.put("/:cid", updateAllCartController );
router.delete("/:cid", deleteProductToCartController);
router.delete("/:cid/product/:pid", deleteProductFromCartController);


export default router;