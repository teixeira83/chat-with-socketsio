const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    const userName = socket.handshake.query.userName;

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg, userName);
    });
});

server.listen(3000, () => {
  console.log('Chat rodando na porta 3000');
});