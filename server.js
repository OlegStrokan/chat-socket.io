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

const rooms = new Map();

app.get('/rooms', (request, response) => {
    response.json(rooms)
});


app.post('/rooms', (request, response) => {
    console.log('this is post request')
});

io.on('connection', socket => {
    console.log('user connected', socket.id);
})

server.listen(9999, (error) => {
    if (error) {
        throw Error(error);
    }
    console.log('Server started');
});




