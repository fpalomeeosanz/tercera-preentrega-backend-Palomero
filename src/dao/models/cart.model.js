import mongoose from "mongoose";

const collection = "Cart"; 

const CartSchema = new mongoose.Schema({
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
            }
        }
    ]
});

CartSchema.pre("find", function(){
    this.populate("products.product");
})

const cartModel = mongoose.model(collection, CartSchema);

export default cartModel;