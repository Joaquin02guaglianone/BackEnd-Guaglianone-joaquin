const socket = io();

let $messagelist = document.getElementById("message-list")

socket.on(`getmessage`, (message) => {
    $messagelist.innerHTML = "";
    message.forEach((msm)=> {
        const user = msm.user
        const messages = msm.message
        const uElement = document.createElement("p")
        const mElement = document.createElement("p")
        uElement.textContent = user;
        mElement.textContent = messages;
        $messagelist.appendChild(uElement)
        $messagelist.appendChild(mElement) 
    })
})
