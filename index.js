var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/test'));

io.on('connection', function(socket) {

  socket.on('set username', function(username){
    socket.username = username;

    socket.emit('joined', username);
    io.emit('new user', username);
    console.log('username: ' + username);
  });

  socket.on('message', function(message){
    io.emit('message', message);
    console.log('message: ' + message);
  });

});

http.listen(80, function() {
  console.log('listening on *:80');
});