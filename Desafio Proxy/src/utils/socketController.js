//const MessagesController = require("../../controller/messagesController")
const MessagesController = require("../../controller/messagesController");
//import { normalizeMessages } from "../normalizr/normalizeMessages.js";
const { normalizeMessages } = require("../normalizr/normalizeMessages");

const messagesController = new MessagesController();

const socketController = (io) => {
  io.on("connection", async (socket) => {
    //console.log("Nuevo Cliente Conectado: " + socket.id);
    io.sockets.emit(
      "messages",
      normalizeMessages(await messagesController.getAll({ sort: true }))
    );
    //queda escuchando el siguiente socket, socket es el usuario/cliente
    socket.on("new-message", async (msjClient) => {
      await messagesController.save(JSON.parse(msjClient));
      io.sockets.emit(
        "messages",
        normalizeMessages(await messagesController.getAll({ sort: true }))
      );
    });
  });
};
module.exports = { socketController };
