import { chatSocket } from './socketChat.js';

//Exporto el modelo de socket
export const socketModel = (io) => {
    //Configuracion de Socket
    io.on('connection', async (socket) => {
        console.log('Nuevo cliente conectado!');
        socket.on('new-message', (data) => {
            console.log(data);
            io.sockets.emit('messages', data);
        });
        chatSocket(socket, io);
    });

}
