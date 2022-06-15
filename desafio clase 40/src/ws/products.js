const DAOFactory = require("../models/daos/daos.factory");
const CreateDTO = require("../models/dtos/create.dto");

const productsDao = DAOFactory().product;

const addProductsHandlers = async (socket, sockets) => {
	const products = await productsDao.getAll();
  socket.emit("products", products);

  socket.on("update", async product => {
    await productsDao.save(new CreateDTO(product));
		const products = await productsDao.getAll();
    sockets.emit("products", products);
  });
};

module.exports = addProductsHandlers