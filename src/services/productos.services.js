import { ProductosDB } from "../persistencia/products.js";

const productosDB = new ProductosDB();

class ProductosService{
    static getProductos = () => {
        const productos = productosDB.get();
        return productos;
    }
    static saveProducto = (producto) => {
        const result = productosDB.save(producto);
        return result;
    }
};

export { ProductosService };
