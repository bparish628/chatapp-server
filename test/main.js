$(function() {
  // Initialize varibles
  var socket = io();

  function logEvent(text){
    $('.log').append('<li class="list-group-item">' + text + '</li>');
    console.log(text);
  }

  $('.set-username').on('click', function(){
    socket.emit('set username', $('.username').val());
  });

  $('.send-message').on('click', function(){
    socket.emit('message', $('.message').val());
  });

  // Socket events
  socket.on('new user', function (username) {
    var text = 'New User: ' + username;
    logEvent(text);
  });

  socket.on('message', function (data) {
    var text = 'Message: ' + data;
    logEvent(text);
  });

  socket.on('user joined', function (data) {
    var text = data.username + ' joined';
    logEvent(text);
  });

});