var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = 80;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

io.on('connection', function (socket) {

  socket.on('message', function (data) {
    socket.broadcast.emit('message', {
      username: socket.username,
      message: data
    });
  });

  socket.on('new user', function (username) {
    socket.username = username;
    socket.broadcast.emit('user joined', {
      username: socket.username
    });
  });

  socket.on('disconnect', function () {
    socket.broadcast.emit('user left', {
	  username: socket.username
    });
  });
});