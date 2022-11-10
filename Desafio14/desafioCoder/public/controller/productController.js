const { createNFakeProducts } = require("../models/mocks/index");
const { errorLogger } = require("../src/utils/loggers");

const productController = {
  getData: async (req, res) => {
    try {
      let products = await createNFakeProducts(5);
      if (products.length > 0) {
        res.render("pages/products", {
          products: products,
          productsExist: true,
        });
      } else {
        res.render("pages/products", {
          products: products,
          productsExist: false,
        });
      }
    } catch (error) {
      errorLogger.error({
        error: error.message,
      });
      res.status(500).send({ error });
    }
  },
};
module.exports = { productController };
