import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "Product";

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    thumbnail:{
        type: String,
        require: true
    },
    code:{
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true
    },
    stock:{
        type: Number,
        require: true
    }
})

ProductSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(collection, ProductSchema);

export default productsModel;