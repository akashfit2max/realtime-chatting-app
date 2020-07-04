const socket = io();
let name;
//gating textarea
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");
//username area
do {
  name = prompt("Please enter your name: ");
} while (!name);
//cnt stop untill the user types the name
//keyup- event trigger seet to enter key
textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});
//send messahe logic
function sendMessage(message) {
  let msg = {
    user: name, //foramt message as we have to show the name
    message: message.trim(),
  };
  // Append message
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  // Send to server
  socket.emit("message", msg); //via  web socket connection
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div"); // dynamically passing incoming or outgoing message
  let className = type;
  mainDiv.classList.add(className, "message");
 //show username and message
  let markup = `
        <h4>${msg.user}</h4> 
        <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

// Recieve messages
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
