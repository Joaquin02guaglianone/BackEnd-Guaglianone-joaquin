
const socket = io();

let $newMessage = document.getElementById("newMessage")

socket.on(`getMessage`, (message) => {

    const elementLi = document.createElement("li")
    elementLi.textContent = message 
    $newMessage.appendChild(elementLi)

})
