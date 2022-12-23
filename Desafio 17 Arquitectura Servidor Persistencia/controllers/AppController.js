const replace = require("../utils/replaceUsernameOnIndex");
const logger = require("../utils/logger");

class AppController {
    constructor(service) {
        this.service = service;
    }

    async getInfo(_req, res) {
        const data = await this.service.getInfo();
        return res.render("partials/info", { data: data });
    }

    async home(req, res) {
        const parsedData = await replace(req.user.email);
        return res.send(parsedData);
    }

    async notFound(req, res) {
        logger.warn(`Ruta: ${req.path} Metodo: ${req.method}`);
        return res.status(404).json({ message: "page not found" });
    }
}

module.exports = AppController;
