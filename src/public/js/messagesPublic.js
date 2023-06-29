const socket = io();
const $newMessage = document.getElementById("allMessages");

socket.on('allMessages', message => {
  const messages = document.createElement('li');
  const messagespace = document.createElement('hr');
  messages.textContent = message;

  $newMessage.appendChild(messages);
  $newMessage.appendChild(messagespace);
});