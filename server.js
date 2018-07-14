const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socketIO(server);
const port = 3000;
const fps = 60;

app.use('/static', express.static(__dirname + '/static'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port, () => {
  console.log('server listening on port ', port);
});

io.on('connection', () => {

});

setInterval(() => {
  io.sockets.emit('message', 'testing');
}, 1000);

const players = {}
io.on('connection', (socket) => {
  socket.on('new player', () => {
    players[socket.id] = {
      x: 300,
      y: 300
    };
  });
  socket.on('movement', (data) => {
    const player = players[socket.id] || {};
    if (data.left) player.x -= 5;
    if (data.up) player.y -= 5;
    if (data.right) player.x += 5;
    if (data.down) player.y += 5;
  });
});

setInterval(() => {
  io.sockets.emit('state', players);
}, 1000 / fps)