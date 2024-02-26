import mongoose from "mongoose";

const collection = "Ticket";

const TicketSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true
    },
    purchase_datetime: Date,
    amount:Number,
    purchaser:{
        type:String,
        required:true
    },
    products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            require: true,
          },
          quantity: {
            type: Number,
            require: true,
            default: 1,
          },
        },
    ],
});

const ticketModel = mongoose.model(collection, TicketSchema);

export default ticketModel;