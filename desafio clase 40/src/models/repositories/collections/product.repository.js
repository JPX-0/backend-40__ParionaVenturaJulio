const DAOFactory = require("../daos/daos.factory");

class ProductRepository {
	constructor() {
		this.product = DAOFactory().product;
		console.log("CLASS: ProductRepository");
	}

	async getData(data) {
		if(!data) return await this.product.getAll();
		const { id, name, maxPrice } = data;
		let nameProduct;
		let priceProduct;
		if(id) return await this.getById(id);
		if(name) {
			nameProduct = await this.product.getByName(name);
			if(!nameProduct) throw new Error(`the NAME: "${name}" entered does not match any product in our database`);
		}
		if(maxPrice) {
			try {
				priceProduct = await this.product.getByPrice(maxPrice);
			} catch (error) {
				throw new Error(`Did you seriously generate an error here? LOL`);
			}
		}
		if(nameProduct && priceProduct) return [...nameProduct, ...priceProduct];
		return nameProduct || priceProduct;
	}

	async getById(idProd) {
		const response = await this.product.getById(idProd);
		if(!response) throw new Error(`the ID: "${idProd}" entered does not match any product in our database`);
		return response;
	}

	async save(data) {
		const response = await this.product.save(data);
		return response._id;
	}

	async update(idProd, data) {
		await this.product.updateById(idProd, data);
	}

	async deleteById(idProd) {
		await this.product.deleteById(idProd);
	}
}

module.exports = ProductRepository;