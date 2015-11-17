var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/test'));

var users = {};

io.on('connection', function(socket) {

  socket.on('join', function(username){
    socket.username = username;
    users[socket.id] = username;

    socket.broadcast.emit('joined', {
      username:username,
      users: users
    });
    console.log(username + ' has joined');
  });

  socket.on('message', function(message){
    io.emit('message', {
      username: socket.username,
      message: message
    });
    console.log(socket.username + ' : ' + message);
  });

  socket.on('typing', function (){
    socket.broadcast.emit('typing', {
      username: socket.username
    });
    console.log(socket.username + 'is typing');
  });

  socket.on('stop typing', function (){
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
    console.log(socket.username + 'stopped typing');
  });

  socket.on('disconnect', function () {
    if (users[socket.id]) {
      delete users[socket.id];

      socket.broadcast.emit('leave', {
        username: socket.username,
        users: users
      });
      console.log(socket.username + ' has left');
    }
  });

});

http.listen(80, function() {
  console.log('listening on *:80');
});