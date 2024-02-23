import { Router } from "express";
import productModel from "../DAO/models/product.model.js";
import { checkRole } from "../middelwares/auth.js";

const router = Router();

router.get("/",(req,res)=>{
    res.send("Estos son todos los productos");
});

router.post("/", checkRole(["admin"]) , async(req,res)=>{
    try {
        const productCreated = await productModel.create(req.body);
        res.send(productCreated);
    } catch (error) {
        res.send(error.message);
    }
});

router.put("/:pid", checkRole(["admin","superadmin","NivelDuende"]) , (req,res)=>{
    res.send("producto agregado");
});

export { router as productsRouter };