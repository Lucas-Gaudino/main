import {faker } from "@faker-js/faker";

//exporto funcion para crear una cantidad de productos random 
export default async function createNFakeProducts(n = 5) {
    let products = [];
    for (let i = 0; i < n; i++) {
        products.push({
            id: await faker.random.uuid(),
            title: await faker.commerce.productName(),
            price: await faker.commerce.price(),
            thumbnail: await faker.image.imageUrl(),
        });
    }
    return products;
}
