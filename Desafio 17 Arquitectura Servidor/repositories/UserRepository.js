const { createHash } = require("../utils/isValidPassword");

class UserRepository {
    constructor(model) {
        this.model = model;
    }

    async getUserByEmail(email) {
        return await this.model.findOne({ email });
    }

    async createUser(data) {
        const newUser = new this.model({
            email: data.email,
            password: createHash(data.password),
        });
        return await newUser.save();
    }
}

module.exports = UserRepository;
