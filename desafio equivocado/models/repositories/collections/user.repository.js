const DAOFactory = require("../../daos/daos.factory");

class UserRepository {
	constructor() {
		this.user = DAOFactory().user;
		console.log("CLASS: UserRepository");
	}

	async getData(data) {
		if(!data) return await this.user.getAll();
		return await this.getById(data.id);
	}

	async getById(idUser) {
		const user = await this.user.getById(idUser);
		if(!user) throw new Error(`the ID: "${idUser}" entered does not match any product in our database`);
		return user;
	}

	async getByEmail(emailUser) {
		const user = await this.user.getByEmail(emailUser);
		if(!user) throw new Error(`the EMAIL: "${emailUser}" entered does not match any product in our database`);
		return user;
	}

	async save(data) {
		return await this.product.save(data);
	}
}

module.exports = UserRepository;