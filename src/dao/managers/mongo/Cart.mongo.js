import cartModel  from "../../models/cart.model.js"

export class CartMongo{
    constructor(){
        this.model = cartModel;
    };

    async get() {
        try {
          return await this.model.find().populate("products.product");
        } catch (error) {
          console.log(error.message);
          throw new Error("Hubo un error al obtener los carritos");
        }
    };

    async post() {
        try {
          const cartCreated = await cartModel.create({});
          return cartCreated;
        } catch (error) {
          console.log(error.message);
          throw new Error("Hubo un error al crear el carrito");
        }
    };

    async put(cartId, productId, quantity) {
        try {
          const cart = await this.model.findByIdAndUpdate(
            cartId,
            { $push: { products: { id: productId, quantity: quantity } } },
            { new: true }
          );
          return cart;
        } catch (error) {
          console.log(error.message);
          throw new Error("Hubo un error al cargar el producto en el carrito");
        }
    };

    async findById(cartId) {
        return await this.model.findById(cartId).populate("products.product");
    };
    
    async removePurchasedProducts(cartId, purchasedProductIds) {
        try {
          const updatedCart = await this.model.findByIdAndUpdate(
            cartId,
            { $pull:  { products: { id: { $in: purchasedProductIds } } } },
            { new: true }
            );
            return updatedCart;

        } catch (error) {
          console.log(error.message);
          throw new Error("Hubo un error al remover productos del carrito");
        }
    };

    async deleteCart(cartId) {
      try {
        const deletedCart = await this.model.findByIdAndDelete(cartId);
    
        if (!deletedCart) {
          throw new Error("Cart not found");
        }
    
        return deletedCart;
      } catch (error) {
        console.log(error.message);
        throw new Error("Hubo un error al eliminar el carrito");
      }
    }

};