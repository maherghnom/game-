var express  = require('express');
var mongoose = require('mongoose');
var routes   = require('./config/routes');
var mw       = require('./config/middleware');


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

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
    
