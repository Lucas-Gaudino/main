const logger = require("../utils/logger");

class ProductService {
    constructor(repository) {
        this.repository = repository;
    }
    async getAll() {
        const datos = await this.repository.getAll();
        return datos;
    }
    async createProduct(data) {
        try {
            return await this.repository.saveProduct(data);
        } catch (err) {
            logger.error(err.message);
        }
    }
}

module.exports = ProductService;
