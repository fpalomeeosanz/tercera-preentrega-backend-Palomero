class ProductsDB{
    
    constructor(){
        this.products = [];
    }
    get(){
        return this.products;
    }
    save(product){
        this.products.push(product);
        return "Producto guardado"
    }
};

export { ProductsDB };