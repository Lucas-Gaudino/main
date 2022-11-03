const socket = io();

export const desnomalize = (data) => {
    const author = new normalizr.schema.Entity('authors');
    const message = new normalizr.schema.Entity('messages', {
        author: author
    });
    const chats = new normalizr.schema.Entity('chats', {
        messages: [message]
    });
    const denormalizedData = normalizr.denormalize(data.result, chats, data.entities);
    return denormalizedData;
    
}

const button = document.getElementById("submitMessage");
button.addEventListener("click", (e) => {
    const message = {
        author:{
            id: document.getElementById("authorId").value,
            nombre : document.getElementById("authorName").value,
            apellido : document.getElementById("authorLastName").value,
            edad : document.getElementById("authorAge").value,
            alias : document.getElementById("authorAlias").value,
            avatar : document.getElementById("authorAvatar").value
        },
        text: document.getElementById("message").value,
    };
    socket.emit("new-message", JSON.stringify(message));
    document.getElementById("caja-msg").value = "";
});


socket.on("messages", (data) => {
    let denormalizedData = desnomalize(JSON.parse(data));
    let compression =
     (JSON.stringify(denormalizedData).length / JSON.stringify(JSON.parse(data)).length).toFixed(2);
     document.getElementById("div-compres").innerHTML = compression;

     const add = denormalizedData.messages.map((message) => {
        return `<div class="message">
        <img src="${message.author.avatar}" alt="avatar" class="avatar">
        <div class="text">
            <p class="author">${message.author.nombre} ${message.author.apellido}</p>
            <p class="message">${message.text}</p>
        </div>
    </div>`;
    });
    document.getElementById("messages").innerHTML = add.join("");
});

document.getElementById("btn-logout").addEventListener("click", (e) => {
    socket.emit("logout");
});