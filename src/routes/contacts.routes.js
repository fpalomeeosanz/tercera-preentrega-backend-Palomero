import { Router } from "express";
import { contactService } from "../repository/indexRepo.js";

const router = Router();

router.post("/", async (req,res)=>{
    try {

        const contactCreated  = await contactService.createContact(req.body);
        res.json({status:"success", payload: contactCreated});
    } catch (error) {
        res.json({status:"error", message:error.message});
        
    }
});

export { router as contactsRouter };