const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    }
})

// приложение может принимать json данные
app.use(express.json());

const rooms = new Map();

app.get('/rooms', (request, response) => {
    response.json(rooms);
});


app.post('/rooms', (request, response) => {
   const {roomId, userName} = request.body
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []],
        ]))
    }
    response.send()
});

io.on('connection', socket => {
    console.log('user connected', socket.id);
    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId);
        rooms.get(roomId).get('users').set(socket.id, userName);
        const users = [...rooms.get(roomId).get('users').values()];
        // отправить запрос в определенную комнату - roomId
        socket.to(roomId).broadcast.emit('ROOM:JOINED', users);
    })
})

server.listen(9999, (error) => {
    if (error) {
        throw Error(error);
    }
    console.log('Server started');
});




