const DAOFactory = require("../models/daos/daos.factory");
const CreateDTO = require("../models/dtos/create.dto");
const { normalizedMessages } = require("../models/normalizer/messages");

const messagesDao = DAOFactory().message;
const usersDao = DAOFactory().user;

const addMenssagesHandlers = async (socket, sockets) => {
  sockets.emit("messages", normalizedMessages(await messagesDao.getAll()));

  socket.on("newMessage", async message => {
    const author = await usersDao.getByEmail(message.email)._id;
    await messagesDao.save(new CreateDTO({ author, text: message.text }));
    sockets.emit("messages", normalizedMessages(await messagesDao.getAll()));
  });
};

module.exports = addMenssagesHandlers;