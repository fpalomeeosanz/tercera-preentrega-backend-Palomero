import { Router } from "express";
import { ProductsController } from "../controllers/products.controller.js";

const router = Router();

router.get("/", ProductsController.getProducts);
router.post("/", ProductsController.saveProduct);

export { router as productsRouter };