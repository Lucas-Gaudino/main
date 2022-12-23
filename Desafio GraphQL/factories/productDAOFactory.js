const ProductDAOMongo = require("../DAOs/product/ProductDAOMongo");
const ProductDAOMemory = require("../DAOs/product/ProductDAOMemory");

const storageMapper = {
    MEMORY: () => new ProductDAOMemory(),
    MONGO: () => new ProductDAOMongo(),
};

module.exports = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper.memory;
    const dao = storageDAOFn();
    return dao;
};
