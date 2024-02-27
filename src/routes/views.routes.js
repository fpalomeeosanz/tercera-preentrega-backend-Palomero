import { Router } from "express";
import userModel from "../DAO/models/user.model.js";

const router = Router();

router.get("/", async (req,res) => {
    
    try{
        let users = await userModel.find().lean();
        res.send({result: "success", payload: users})
    }catch(error){
        console.log("No se puede tener usuarios desde Mongoose" + error)
    } 
    
    res.render("register")
})

router.get("/login", async(req,res) => {
    res.render("/login")
})

router.get("/usuarios", async (req,res) => {
    
    const users = await userModel.find().lean();
    
    res.render("users", {users, isAdmin: true})
})

export { router as viewsRouter };
 