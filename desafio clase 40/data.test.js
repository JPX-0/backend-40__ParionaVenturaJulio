const DAOFactory = require("./models/daos/daos.factory");

(async () => {
  console.log(await DAOFactory().product.getById("62a76c106c7ec5a606f81a00"));
  console.log(await DAOFactory().product.getById("62a76c106c7ec5a606f81a00"));
})();