import mongoose from "mongoose";

const collection = "contact";

const ContactSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    telefono:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
});


const contactModel = mongoose.model(collection, ContactSchema);

export default contactModel;