const logger = require("../utils/logger");
const replace = require("../utils/replaceUsernameOnIndex");
const createRandomProducts = require("../utils/createRandomProducts");

class ProductController {
    constructor(service) {
        this.service = service;
    }

    async get(req, res) {
        console.log(this);
        const datos = await this.service.getAll();
        return res.send(datos);
    }

    async createRandom(_req, res) {
        const randomProducts = createRandomProducts(5);
        return res.render("partials/products-table", {
            productos: randomProducts,
        });
    }
}

module.exports = ProductController;
