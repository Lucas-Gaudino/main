const logger = require("../utils/logger");
const replace = require("../utils/replaceUsernameOnIndex");
const createRandomProducts = require("../utils/createRandomProducts");

class ProductController {
    constructor(service) {
        this.service = service;
    }

    async get(req, res) {
        let datos;
        if (req.params.id) datos = await this.service.getOne(req.params.id);
        else datos = await this.service.getAll();

        return datos ? res.status(200).send(datos) : res.status(404).json({ message: "product not found" });
    }

    async createProduct(req, res) {
        const product = await this.service.createProduct(req.body);
        return res.status(201).json(product);
    }

    async createRandom(_req, res) {
        const randomProducts = createRandomProducts(5);
        return res.render("partials/products-table", {
            productos: randomProducts,
        });
    }

    async updateProduct(req, res) {
        const prod = await this.service.updateProduct(req.params.id, req.body);
        return res.sendStatus(204);
    }
    async deleteProduct(req, res) {
        console.log({ id: req.params.id });

        const isDeleted = await this.service.deleteProduct(req.params.id, req.body);
        if (isDeleted) return res.sendStatus(204);
        else return res.status(404).json({ error: "there was an error" });
    }
}

module.exports = ProductController;
