const fs = require("fs");

class Storage {
    constructor() {
        this.productsFilename = "products.json";
        this.cartsFilename = "carts.json";
    }

    saveFile = async (newArr, filePath) => {
        try {
            await fs.promises.writeFile(filePath, JSON.stringify(newArr, null, 2));
        } catch (err) {
            throw new Error(err);
        }
    };

    getFile = async (filename) => {
        let arr;
        try {
            const file = await fs.promises.readFile(filename, "utf-8");
            if (!file) arr = [];
            else arr = JSON.parse(file);
        } catch (err) {
            throw Error(err);
        }
        return arr;
    };

    getProducts = async () => {
        return await this.getFile(this.productsFilename);
    };

    getProductById = async (id) => {
        let arr = await this.getFile(this.productsFilename);
        let product = arr.find((product) => product.id === Number(id));
        return product;
    };

    createProduct = async (product) => {
        const productArr = await this.getFile(this.productsFilename);
        const lastId = productArr.length > 0 ? productArr[productArr.length - 1].id : 0;
        product.id = lastId + 1;
        product.created_at = Date.now();
        productArr.push(product);
        this.saveFile(productArr, this.productsFilename);
        return;
    };

    updateProduct = async (id, newProduct) => {
        const productArr = await this.getFile(this.productsFilename);
        const newArr = productArr.map((product) => {
            if (Number(id) !== product.id) return product;
            else {
                newProduct.id = product.id;
                newProduct.created_at = product.created_at;
                return newProduct;
            }
        });
        this.saveFile(newArr, this.productsFilename);
        return;
    };

    deleteProduct = async (id) => {
        const productArr = await this.getFile(this.productsFilename);
        const newArr = productArr.filter((product) => product.id !== Number(id));
        this.saveFile(newArr, this.productsFilename);
        return;
    };

    saveFile = async (newArr, filePath) => {
        await fs.promises.writeFile(filePath, JSON.stringify(newArr, null, 2));
    };

    createCart = async () => {
        const cartArr = await this.getFile(this.cartsFilename);
        const newCart = {};
        const lastId = cartArr.length > 0 ? cartArr[cartArr.length - 1].id : 0;
        newCart.id = lastId + 1;
        newCart.created_at = Date.now();
        newCart.products = [];
        cartArr.push(newCart);
        await this.saveFile(cartArr, this.cartsFilename);
        return newCart.id;
    };

    deleteCart = async (id) => {
        const cartArr = await this.getFile(this.cartsFilename);
        const newCartArr = cartArr.filter((cart) => cart.id !== Number(id));
        this.saveFile(newCartArr, this.cartsFilename);
        return;
    };

    updateCart = async (id, newCart) => {
        const cartArr = await this.getFile(this.cartsFilename);
        const newArr = cartArr.map((cart) => {
            if (Number(id) !== cart.id) return cart;
            else {
                newCart.id = cart.id;
                newCart.created_at = cart.created_at;
                return newCart;
            }
        });
        this.saveFile(newArr, this.cartsFilename);
        return;
    };

    getCartById = async (id) => {
        const cartArr = await this.getFile(this.cartsFilename);
        return cartArr.find((cart) => cart.id === Number(id));
    };

    getCartProducts = async (id) => {
        const cart = await this.getCartById(Number(id));
        return cart.products;
    };

    deleteCartProduct = async (id, prodId) => {
        const cart = await this.getCartById(Number(id));
        const newProductArr = cart.products.filter((prod) => prod.id !== Number(prodId));
        cart.products = [...newProductArr];
        await this.updateCart(id, cart);
        return;
    };

    addCartProduct = async (id, prodId) => {
        const cart = await this.getCartById(Number(id));
        const prod = await this.getProductById(Number(prodId));

        cart.products.push(prod);
        await this.updateCart(id, cart);
        return;
    };
}

module.exports = Storage;
