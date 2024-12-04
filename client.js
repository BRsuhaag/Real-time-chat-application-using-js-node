// const socket = io('http://localhost:8000');

// const form = document.getElementById('send-container')

// const messageInput = document.getElementById('messageInp')
// const messageContainer = document.querySelector('.container')

// const append = (message, position)=>{
//     const messageElement = document.createElement('div')
//     messageElement.innerText = message;
//     messageElement.classList.add('message')
//     messageElement.classList.add(position);
//     messageContainer.append(messageElement)
// }

// const name =  prompt("enter your name to join");


// socket.emit("new-user-joined", name);



// socket.on('user-joined', name =>{
//     append(`${name} joined the chat`, right)

// })


/*chat-gpt > */


// Connect to the Socket.IO server
const socket = io('http://localhost:8000');

// Get references to form, input, and container elements
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

// Function to append a message to the chat container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
};

// Prompt the user to enter their name
const name = prompt("Enter your name to join the chat");
if (name) {
    socket.emit("new-user-joined", name);
}

// Handle event when a user joins
socket.on('user-joined', (name) => {
    append(`${name} joined the chat`, 'right'); // 'right' should be a string
});

// Handle event when a message is received
socket.on('receive', (data) => {
    append(`${data.name}: ${data.message}`, 'left'); // 'left' should be a string
});

// Handle event when a user leaves
socket.on('user-left', (name) => {
    append(`${name} left the chat`, 'right');
});

// Form submission to send a message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});



