class ProductosDB{
    constructor(){
        this.productos = [];
    }
    get(){
        return this.productos;
    }
    save(producto){
        this.productos.push(producto);
        return "Servicio guardado"
    }
};

export { ProductosDB };