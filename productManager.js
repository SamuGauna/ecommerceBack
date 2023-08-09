const fs = require('fs')


class ProductManager{
    static productId = 0;
    constructor(path){
        this.products = []
        this.dirName = './files'
        this.fileName = this.dirName + path   
        this.fs = fs
    }
    createFile = async()=>{
        try {
            if(!this.fs.existsSync(this.fileName)){
                await this.fs.promises.mkdir(this.dirName, {recursive: true})
                await this.fs.promises.writeFile(this.fileName, "[]")
            }
        } catch (error) {
            throw Error `El archivo ya se encuentra creado ${error}`
        }
    }
    addProduct = async(title, description, price, thumbnail, code, stock) =>{
        try {
            let productsJs = await this.getProducts();
            const searchCode = productsJs.some((prod => prod.code == code))
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
                productsJs.push(newProduct)
                await this.fs.promises.writeFile(this.fileName, JSON.stringify(productsJs), null, '\t')
                console.log("Producto agregado exitosamente");
            } else{
                console.log("Le faltan datos para agregar el producto")
            }
        } 
        catch (error) {
            throw Error ("No se puede agregar el producto.")
        }
        
        
    }
    getProducts = async()=>{
        try {
            let readDoc = await this.fs.promises.readFile(this.fileName, "utf-8")
            let readDocParse = await JSON.parse(readDoc)
            return readDocParse
        } catch (error) {
            console.log(error);
        }
    }
    getProductById = async(idProduct)=>{
        try {
            let readDoc = await this.fs.promises.readFile(this.fileName, "utf-8" )
            let readDocParse = await JSON.parse(readDoc)
            const productFind = readDocParse.find((prod)=> prod.id == idProduct)
        if (productFind){
            console.log("El producto fue encontrado en el carrito")
            console.log(productFind);
            return productFind
        } console.log(`Product with id:${idProduct} not found`);
        } catch (error) {
            
        }
        
    }
    updateProduct = async(idUpdate, updateData)=>{
        try {
            let readDoc = await this.fs.promises.readFile(this.fileName, "utf-8" )
            let readDocParse = await JSON.parse(readDoc)
            let indexProduct = readDocParse.findIndex((p => p.id === idUpdate))   
            if (indexProduct != -1) {                  
                const updatedProduct = {
                    ...readDocParse[indexProduct],
                    ...updateData,
                };
                readDocParse[indexProduct] = updatedProduct
                await fs.promises.writeFile(this.fileName, JSON.stringify(readDocParse, null, 2));
                console.log(`Producto actualizado exitosamente`);
            } else {
                throw Error ("El id recibido no coincide")
            }
        } catch (error) {
            
        }
    }
    deleteProduct = async(id)=>{
        try {
            let readDoc = await this.fs.promises.readFile(this.fileName, "utf-8" )
            let readDocParse = await JSON.parse(readDoc)
            let newArray = []
            let searchProd = readDocParse.find((p=> p.id === id))
            if(searchProd){
                newArray = readDocParse.filter((p)=> p.id !== id)
                await this.fs.promises.writeFile(this.fileName, JSON.stringify(newArray, null, '\t'))
            } else {
                console.log("Ningun producto contiene el id recibido ");
            }

        } catch (error) {
            throw Error ("El id recibido no coincide")
        }
    }

}

// // Agregando al carrito
// const product = new ProductManager();
// product.addProduct("Escoba", "SemiNueva", 100, "urlCualquiera", "1sas210", 5);
// console.log(product.getProducts())
// // Consulta por falta de datos
// product.addProduct("Escoba", "SemiNueva", 100, "urlCualquiera", "1sas210");
// // Consulta por mismo code que un producto en el carrito 
// product.addProduct("Escoba", "SemiNueva", 100, "urlCualquiera", "1sas210", 5);
// // Consulta por id
// ;
// // Consulta por id no encontrado
// product.getProductById(10);

const product = new ProductManager("/products.json")
 const testing = async()=>{
    try {
        await product.createFile();
        console.log(await product.getProducts()) 
        await product.addProduct("Escoba", "SemiNueva", 100, "urlCualquiera", "1sas210", 5);
        await product.getProductById(0)
        await product.deleteProduct(0);
        await product.updateProduct(0,{price:300, stock:30})
    } catch (error) {
        console.log(error);
    }
    
 }
 testing();