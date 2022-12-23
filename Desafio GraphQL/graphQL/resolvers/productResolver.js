const ProductService = require("../../services/ProductService");

class ProductResolver {
    constructor() {
        this.service = new ProductService();
    }

    getProduct = async ({ id }) => {
        const datos = await this.service.getOne(id);
        return datos;
    };

    getProducts = async ({ campo, valor }) => {
        const datos = await this.service.getAll();
        if (campo && valor) return datos.filter((prod) => prod[campo] == valor);
        return datos;
    };

    createProduct = async ({ values }) => {
        const data = await this.service.createProduct(values);
        return data;
    };

    updateProduct = async ({ id, values }) => {
        const data = await this.service.updateProduct(id, values);
        return data;
    };

    deleteProduct = async ({ id }) => {
        return await this.service.deleteProduct(id);
    };
}

module.exports = ProductResolver;
