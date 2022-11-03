import { normalize , schema } from 'normalizr' ; const message = new schema . Entity ( 'messages' ) ; const messages = [ { id : 1 , text : 'Hello World' } , { id : 2 , text : 'Bye World' } ] ; const normalizedMessages = normalize ( messages , [ message ] ) ; console . log ( normalizedMessages ) ;

//Creamos una funcion que recivba un array y me devuelva todo el array normalizado
const debuggChat  = (messages) => {
    const arr = {id: "mensajes", chats :[]};
    arr.chats = messages.map((item) => {
        return {id: item.id, text: item.text}
    });
    return arr;
}

//Creamos una funcion que recivba un array y me devuelva todo el array normalizado
export const  normalizeMessages  = (messages) => {
    //Formateo de mensajes
    const debuggChat= debuggChat(messages);
    //Normalizacion de mensajes
    const message = new schema.Entity('mensajes', {
        author : author
    })
    const author = new schema.Entity('authors')
    //Creo el schema entity de los chats
    const chats = new schema.Entity('chats', {
        mensajes: [message]
    })
    const normalizedMessages = normalize(debuggChat, chats);
    return normalizedMessages;
}