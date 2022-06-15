const DAOFactory = require("../daos/daos.factory");

class MessageRepository {
	constructor() {
		this.message = DAOFactory().message;
		this.user = DAOFactory().user;
		console.log("CLASS: MessageRepository");
	}

	async getData(data) {
		if(!data) return await this.message.getAll();
		return await this.getById(data.id);
	}

	async getById(idUser) {
		const user = await this.user.getById(idUser);
		if(!user) throw new Error(`the ID: "${idUser}" entered does not match any product in our database`);
		const messages = [];
		for (let i = 0; i < user.chatHistory.length; i++) {
			const idMsg = user.chatHistory[i];
			const message = await this.message.getById(idMsg);
			messages.push(message);
		}
		return messages;
	}

	async save(data) {
		await this.product.save(data);
		return "Message sent";
	}
}

module.exports = MessageRepository;