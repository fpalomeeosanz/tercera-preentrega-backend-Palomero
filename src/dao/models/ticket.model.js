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
    }
});

export const ticketModel = mongoose.model(collection, TicketSchema);