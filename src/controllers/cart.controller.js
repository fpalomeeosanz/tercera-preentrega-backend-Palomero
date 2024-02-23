import { v4 as uuidv4 } from 'uuid';
import { CartMongo } from "../DAO/managers/mongo/Cart.mongo.js";
import  productModel  from "../DAO/models/product.model.js";
import { ticketModel } from "../DAO/models/ticket.model.js";


const CartModel = new CartMongo();

export const purchase = async (req,res) => {
    try {

        const cartId = req.params.cid;
        const cart = await CartModel.findById(cartId);
        if(cart){
            if(!cart.products.length){
                return res.send("es necesario que agrege productos antes de realizar la compra")
            }
            const ticketProducts = [];
            const rejectedProducts = [];

            for(let i=0; i<cart.products.length;i++){

                const cartProduct = cart.products[i];
                const productDB = await productModel.findById(cartProduct.id);
                
                if(cartProduct.quantity<=productDB.stock){
                    ticketProducts.push(cartProduct);
                } else {
                    rejectedProducts.push(cartProduct);
                }
            }

            console.log("ticketProducts",ticketProducts)
            console.log("rejectedProducts",rejectedProducts)

            const newTicket = {
                code:uuidv4(),
                purchase_datetime: new Date().toLocaleString(),
                amount:500,
                purchaser:req.user.email
            }

            const ticketCreated = await ticketModel.create(newTicket);
            res.send(ticketCreated)
        } else {
            res.send("el carrito no existe")
        }
    } catch (error) {
        res.send(error.message)
    }
};

