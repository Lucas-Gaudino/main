import {faker} from "@faker-js/faker";

//exporto funcion para crear id random con faker
export default async function createId() {
    return await faker.random.uuid();
}