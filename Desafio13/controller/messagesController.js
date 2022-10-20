import moongose from 'mongoose';
import Messages  from '../models/messageSchema.js';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  }
class MessagesController {
    constructor(){
        try{
            moongose.connect('mongodb://localhost:27017/ecommerce', options);
            console.log("Conectado a la base de datos");
        }
        catch(error){
            console.log("Error al conectar a la base de datos");
        }
    }
    async save(message){
        try{
            let timestamp = new Date().getTime();
            message.timestamp = timestamp;
            await MessageSchema.create(message);
            console.log("Mensaje guardado");
            return message;
        }
        catch(error){
            console.log("Error al guardar el mensaje");
        }
    }
    async getAll(Opt){
        try{
            let messages;
            if(Opt?.sort == "true"){
                messages = await MessageSchema.find().sort({timestamp: 1});

            } else {
                messages = await MessageSchema.find();
            }
            console.log("Mensajes obtenidos");
            return messages;
        }catch(error){
            console.log("Error al obtener los mensajes");
        }
    }
    
}

export default MessagesController;