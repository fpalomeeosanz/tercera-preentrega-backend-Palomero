import { Router } from "express";
import  cartModel  from "../DAO/models/cart.model.js";
import { purchase } from "../controllers/cart.controller.js";

const router = Router();

//GET:
router.get("/", async (req, res) => {
  try {
    const carts = await cartModel.find();
    res.send({ status: "success", carritos: carts });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", msg: "Error al obtener carritos" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartModel.findById(cid).populate("products"); 

    if (!cart) {
      return res.status(404).send({ status: "error", msg: "Carrito no encontrado" });
    }

    res.send({ status: "success", cart: cart });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", msg: "Error al obtener carrito" });
  }
});

//POST

router.post("/", async (req, res) => {
  try {
    const cartCreated = await cartModel.create({});
    res.send({ status: "success", msg: cartCreated });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", msg: "Error al crear carrito" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;

    const cart = await cartModel.findById(cid);

    if (!cart) {
      return res.status(404).send({ status: "error", msg: "Carrito no encontrado" });
    }

    const product = await productModel.findById(pid); 

    if (!product) {
      return res.status(404).send({ status: "error", msg: "Producto no encontrado" });
    }

    
    cart.products.push({ product: product._id, quantity: quantity });

    
    await cart.save();

    res.send({
      status: "success",
      msg: `Producto agregado al carrito - CID: ${cid}, PID: ${pid}`,
      carrito: cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", msg: "Error al agregar producto al carrito" });
  }
});

//PUT

router.put(`/:cid`, async (req, res) => {
  try {
    const cid = req.params.cid;
    const products = req.body.products;

    const cart = await cartModel.findByIdAndUpdate(cid, { products: products });

    if (!cart) {
      return res.status(404).send({ status: "error", msg: "Carrito no encontrado" });
    }

    res.send({ status: "success", msg: "Carrito actualizado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", msg: "Error al actualizar carrito" });
  }
});

router.put(`/:cid/products/:pid`, async (req, res) => {

try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;

    
    if (quantity <= 0) {
      return res.status(400).send({ status: "error", msg: "Cantidad del producto debe ser mayor a 0" });
    }

    const cart = await cartModel.findById(cid).populate("products");

    if (!cart) {
      return res.status(404).send({ status: "error", msg: "Carrito no encontrado" });
    }

    const product = await productModel.findById(pid); // Buscar producto por ID

    if (!product) {
      return res.status(404).send({ status: "error", msg: "Producto no encontrado" });
    }

     const cartProduct = cart.products.find(p => p.product._id.toString() === pid);

    if (!cartProduct) {
      return res.status(404).send({ status: "error", msg: "Producto no existe en el carrito" });
    }

    cartProduct.quantity = quantity;

    await cart.save();

    res.send({ status: "success", msg: `Cantidad del producto actualizada en el carrito - CID: ${cid}, PID: ${pid}` });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", msg: "Error al actualizar cantidad de producto" });
  }
});
      
//DELETE 
router.delete(`/:cid`, async (req, res) => {
    try {
      const cid = req.params.cid;
  
      const cart = await cartModel.findById(cid);
  
      if (!cart) {
        return res.status(404).send({ status: "error", msg: "Carrito no encontrado" });
      }
      await cartModel.findByIdAndDelete(cid);
  
      res.send({ status: "success", msg: "Carrito eliminado correctamente" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error", msg: "Error al eliminar carrito" });
    }
});

router.delete(`/:cid/products/:pid`, async (req, res) => {
    try {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const cart = await cartModel.findById(cid).populate("products");

    if (!cart) {
      return res.status(404).send({ status: "error", msg: "Carrito no encontrado" });
    }

    const product = await productModel.findById(pid);

    if (!product) {
      return res.status(404).send({ status: "error", msg: "Producto no encontrado" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product._id.toString() === pid
    );

    if (productIndex === -1) {
      return res.status(404).send({ status: "error", msg: "Producto no encontrado en el carrito" });
    }

    cart.products.splice(productIndex, 1);

    await cart.save();

    res.send({ status: "success", msg: "Producto eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", msg: "Error al eliminar producto del carrito" });
  }
});
    
//CARRITO
router.get(":cid/carts/", async (req, res) => {
  
    const cartId = req.params.cid;
    const cart = await cartModel.findById(cartId);
  
    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }
  
    res.render("cart", { cartId });
});
  
//PURCHASE
router.post(":cid/purchase", async (req, res) => {
    try {
      const cid = req.body.cid;
      const paymentMethod = req.body.paymentMethod;
  
      const cart = await cartModel.findById(cid).populate("products");
  
      if (!cart) {
        return res.status(404).send({ status: "error", msg: "Carrito no encontrado" });
      }
  
      if (cart.products.length === 0) {
        return res.status(400).send({ status: "error", msg: "El carrito está vacío" });
      }
  
      
      if (!["efectivo", "tarjeta"].includes(paymentMethod)) {
        return res.status(400).send({ status: "error", msg: "Método de pago no válido" });
      }
  
      
      const unavailableProducts = [];
      
      for (const cartProduct of cart.products) {
        const product = await productModel.findById(cartProduct.product._id);
        if (product.stock < cartProduct.quantity) {
          unavailableProducts.push(cartProduct.product._id);
        }
      }
  
      if (unavailableProducts.length > 0) {
        return res.status(400).send({
          status: "error",
          msg: "Productos sin stock disponible",
          unavailableProducts,
        });
      }
  
      //SIMULACION
      console.log(`Procesando pago por ${cart.getTotalPrice()} con ${paymentMethod}...`);
  
      //MODELO PURHCASE
      const purchase = await purchaseModel.create({ cart: cart._id, paymentMethod });
  
      
      for (const cartProduct of cart.products) {
        const product = await productModel.findById(cartProduct.product._id);
        product.stock -= cartProduct.quantity;
        await product.save();
      }
  
      const ticket = await generateTicket(purchase._id, cart);
      
      cart.products = cart.products.filter(
        (p) => !unavailableProducts.includes(p.product._id.toString())
      );
      await cart.save();
  
      res.send({
        status: "success",
        msg: "Compra realizada correctamente",
        purchase: purchase,
        ticket,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: "error", msg: "Error al procesar la compra" });
    }
});

export  { router as  cartsRouter };