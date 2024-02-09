import { ProductsService  } from "../services/products.services.js"

class ProductsController{
    static getProducts = async (req, res) => {
        const products = ProductsService.getProducts();
        res.json({status: "success", data: products});
    }
    static saveProduct = (req, res) => {
    
        const result = ProductsService.saveProduct(req.body);
        res.json({status: "succes", message: result})
    }
}

export { ProductsController };