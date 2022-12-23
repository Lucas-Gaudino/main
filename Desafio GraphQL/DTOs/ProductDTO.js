class ProductDTO {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.thumbnail = product.thumbnail;
        this.id = product._id || product.id;
    }
}

module.exports = ProductDTO;
