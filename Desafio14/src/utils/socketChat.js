//Importamos todo lo que necesito para controlar los mensajes 
import MessagesController from '../../controller/messagesController.js';
const messagesController = new MessagesController();
//Importamos todo lo que necesito para normalizar los mensajes
import { normalizeMessages } from '../normalizr/normalizeMessages.js';

//Creo y exporto una funcion que reciba socket e io y que me maneje el chat 
export const chatSocket = async (socket, io) => {
    let messages = await messagesController.getAll();
    io.sockets.emit('messages', normalizeMessages(messages));
    socket.on('new-message', async (data) => {
        let message = JSON.parse(data);
        await messagesController.save(message);
        let allMessages = await messagesController.getAll();
        io.sockets.emit('messages', normalizeMessages(allMessages));
    });
}
