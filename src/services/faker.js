import {faker} from "@faker-js/faker"

export const generateProductFaker = async() =>{
    const product = {
        title: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        status: faker.datatype.boolean()
    }
    return product
}