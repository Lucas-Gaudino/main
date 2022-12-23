const UserDAOMongo = require("../DAOs/user/UserDAOMongo");
//const UserDAOMemory = require("../DAOs/user/UserDAOMemory");

const storageMapper = {
    MEMORY: () => new UserDAOMemory(),
    MONGO: () => new UserDAOMongo(),
};

module.exports = (storage) => {
    //const storageDAOFn = storageMapper[storage] || storageMapper.MONGO;

    const storageDAOFn = storageMapper.MONGO;
    const dao = storageDAOFn();
    return dao;
};
