const MessageRepository = require("../repositories/MessageRepository");
const logger = require("../utils/logger");
const formatDate = require("../utils/dateFormatter");
class MessageService {
    constructor(repository) {
        this.repository = repository;
    }

    async getAll() {
        const datos = await this.repository.getAll();
        return datos;
    }

    async createMessage(data) {
        const now = new Date();
        const newMessage = {
            text: data.message,
            author: data.user,
            time: formatDate(now),
        };
        try {
            await this.repository.saveMessage(newMessage);
            return newMessage;
        } catch (err) {
            logger.error(err.message);
        }
    }
}

module.exports = MessageService;
