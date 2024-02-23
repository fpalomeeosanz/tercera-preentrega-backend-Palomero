import { Router } from "express";
import  cartModel  from "../DAO/models/cart.model.js";
import { purchase } from "../controllers/cart.controller.js";

const router = Router();

router.post("/",async(req,res)=>{
    try {
        const cartCreated = await cartModel.create({});
        res.send(cartCreated)
    } catch (error) {
        res.send(error.message)
    }
});

router.get("/",async(req,res)=>{
    try {
        const cartCreated = await cartModel.find();
        res.send(cartCreated)
    } catch (error) {
        res.send(error.message)
    }
});

router.put("/",async(req,res)=>{
    try {
        const {cartId, productId, quantity} = req.body;
        const cart = await cartModel.findById(cartId);
        cart.products.push({id:productId,quantity:quantity});
        cart.save();
        res.send("producto agregado")
    } catch (error) {
        res.send(error.message)
    }
});

router.post("/:cid/purchase", purchase);

export { router as cartsRouter };