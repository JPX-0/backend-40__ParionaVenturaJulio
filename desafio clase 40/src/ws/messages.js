const DAOFactory = require("../models/daos/daos.factory");
const CreateDTO = require("../models/dtos/create.dto");
const { normalizedMessages } = require("../models/normalizer/messages");

const messagesDao = DAOFactory().message;
const usersDao = DAOFactory().user;

const addMenssagesHandlers = async (socket, sockets) => {
  sockets.emit("messages", normalizedMessages(await messagesDao.getAll()));

  socket.on("newMessage", async message => {
    console.log("message.email: ", message.email);
    const user = await usersDao.getByEmail(message.email);
    const newMessage = {
      author: user._id,
      text: message.text,
    };
    await messagesDao.save(new CreateDTO(newMessage));
    sockets.emit("messages", normalizedMessages(await messagesDao.getAll()));
  });
};

module.exports = addMenssagesHandlers;