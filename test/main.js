$(function() {
  // Initialize varibles
  var socket = io();
  var isTyping = false;

  function logEvent(text){
    $('.log').append('<li class="list-group-item">' + text + '</li>');
    console.log(text);
  }

  $('.set-username').on('click', function(){
    socket.emit('join', $('.username').val());
  });

  $('.send-message').on('click', function(){
    socket.emit('message', $('.message').val());
    $('.message').val('');
  });

  // Socket events
  socket.on('joined', function (data) {
    var text = data.username + ' has joined';
    logEvent(text);
  });

  socket.on('login', function (data) {
    var text = 'You logged in!';
    logEvent(text);
  });

  socket.on('message', function (data) {
    var text = data.username + ' : ' + data.message;
    logEvent(text);
  });

  socket.on('typing', function (data) {
    var text = data.username + ' is typing';
    logEvent(text);
  });

  socket.on('stop typing', function (data) {
    var text = data.username + ' stopped typing';
    logEvent(text);
  });

  socket.on('leave', function (data) {
    var text = data.username + ' has left';
    logEvent(text);
  });

});