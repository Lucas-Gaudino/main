const MongoContainer = require("../../containers/MongoContainer");
const { Product } = require("../../models/Product");
const { User } = require("../../models/User");

class UserDaoMongoDB extends MongoContainer {
    constructor() {
        super(User);
    }

    getByEmail = async (email) => {
        console.log("entro");
        try {
            const user = await this.model.findOne({ email });
            return user;
        } catch (err) {
            console.log(err);
        }
    };

    addCart = async (userId, cartId) => {
        try {
            const user = await this.model.findOneAndUpdate({ _id: userId }, { cart_id: cartId });
            return cartId;
        } catch (err) {
            console.log(err);
        }
    };

    deleteCart = async (id) => {
        try {
            const user = this.model.findOneAndUpdate({ cart_id: id }, { $unset: { cart_id: 1 } });
            return user;
        } catch (e) {
            console.log(e);
        }
    };
}

module.exports = UserDaoMongoDB;
