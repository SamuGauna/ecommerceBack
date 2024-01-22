import {faker} from "@faker-js/faker"

const generateProductFaker = async() =>{
    const product = {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean()
    }
    return product
}
export const createProductFaker = async(fakerQuantity)=> {
    try {
        let productsFaker = [];
    for(let i = 0; i < Number(fakerQuantity); i++) {
        const productFake = await generateProductFaker();
        productsFaker.push(productFake);
    }
    return productsFaker
    } catch (error) {
        console.log(`Error en createProductFaker: ${error}`);
        throw error;
    }
}