class ProductManager{
    static productId = 0;
    constructor(){
        this.products = []
    }
    addProduct(title, description, price, thumbnail, code, stock){
        const searchCode = this.products.some((prod => prod.code == code))
        if(searchCode){
            console.log("No se puede agregar tiene el mismo codigo");
        }
        if(title && description && price && thumbnail && code && stock){
            const newProduct = {
                title, 
                description,
                price,
                thumbnail,
                code,
                stock,
                id: ProductManager.productId++,
            }
            this.products.push(newProduct)
            console.log("Producto agregado exitosamente");
        } else{
            console.log("Le faltan datos para agregar el producto")
        }
    }
    getProducts(){
        return this.products;
    }
    getProductById(idProduct){
        const productFind = this.products.find((prod)=> prod.id == idProduct)
        if (productFind){
            console.log("El producto fue encontrado en el carrito")
            return productFind
        } console.log(`Product with id:${idProduct} not found`);
    }
}

// Agregando al carrito
const product = new ProductManager();
product.addProduct("Escoba", "SemiNueva", 100, "urlCualquiera", "1sas210", 5);
console.log(product.getProducts())
// Consulta por falta de datos
product.addProduct("Escoba", "SemiNueva", 100, "urlCualquiera", "1sas210");
// Consulta por mismo code que un producto en el carrito 
product.addProduct("Escoba", "SemiNueva", 100, "urlCualquiera", "1sas210", 5);
// Consulta por id
product.getProductById(0);
// Consulta por id no encontrado
product.getProductById(10);

