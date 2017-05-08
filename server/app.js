var express  = require('express');
var mongoose = require('mongoose');
var routes   = require('./config/routes');
var mw       = require('./config/middleware');

var count = 0;
//=============================================================================
/*									Server   								 */
//=============================================================================
var app  = express();
// var app = require('express')();
// var server = require('http').Server(app);

mw(app,express);
routes(app,express);
//set express to listen to for requests or certain port
app.use(express.static('client'));

const port = process.env.PORT || 1020;

const server = app.listen(port,function(){
	console.log('wornking on port : ' + port)
 });
var io = require('socket.io')(server); 


// io.sockets.on('connection',newConnection);

// function newConnection(socket){
// count++;
// console.log('new connection',socket.id)
// console.log(count + "active socket");

//   // console.log('-------------------',socket);
// }


io.on('connection', function (socket) {
count++;
console.log(count + "  active socket",socket.id)
  socket.emit('news', { hello: 'world' });
  socket.on('add-message', function (data) {
    console.log('on add msg ');
    console.log(data);
    console.log('post owner',socket.id)
  // socket.broadcast.emit('news', data);//broadcast data to all sockets expect the sender;
  io.sockets.emit('news',data);//sending data to all sockes
    
  });
  
  socket.on('disconnect', function () {
  count--;
   console.log(count + "active socket")
 });
});

    
