import { ProductsDB } from "../persistencia/products.js";

const productsDB = new ProductsDB();

class ProductsService{
    static getProducts = () => {
        const products = productsDB.get();
        return products;
    }
    static saveProduct = (product) => {
        const result = productsDB.save(product);
        return result;
    }
};

export { ProductsService };
