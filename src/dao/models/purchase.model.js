import mongoose from "mongoose";

const collection = "Purchase";

const PurchaseSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["efectivo", "tarjeta"],
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
    required: true,
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
  rejectedProducts: [
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

PurchaseSchema.pre("save", async function (next) {
  const cart = await cartModel.findById(this.cart);
  this.total = cart.getTotalPrice(); 

  next();
});

const purchaseModel = mongoose.model(collection, PurchaseSchema);

export default purchaseModel;



