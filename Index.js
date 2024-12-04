// const io = require('socket.io')(8000)

// const users = {};

// io.on('connection', socket =>{
//     socket.on('new-user-joined', name =>{
//         console.log("New user", name);
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name);
//     });

//     socket.on('send', message =>{
//         socket.broadcast.emit('receive', {message: message, name: user[socket.id]})
// });

// })


/*chatgpt*/

const io = require('socket.io')(8000, {
    cors: {
        origin: 'http://127.0.0.1:3000', // Replace with your frontend's URL if different
        methods: ['GET', 'POST'],       // Allow these HTTP methods
        credentials: true               // Include credentials if needed (e.g., cookies)
    }
});

const users = {};

io.on('connection', (socket) => {
    // Event when a new user joins
    socket.on('new-user-joined', (name) => {
        console.log("New user joined:", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // Event when a user sends a message
    socket.on('send', (message) => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    // Event when a user disconnects
    socket.on('disconnect', () => {
        if (users[socket.id]) {
            socket.broadcast.emit('user-left', users[socket.id]);
            delete users[socket.id];
        }
    });
});
