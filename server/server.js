const express  = require('express');
const mongoose = require('mongoose');
const routes   = require('./config/routes');
const mw       = require('./config/middleware');


let count = 0;
//=============================================================================
/*									Server   								 */
//=============================================================================
const app  = express();


mw(app,express);

//set express to listen to for requests or certain port
app.use(express.static('client'));

let port = process.env.PORT || 1020;

const server = app.listen(port,function(){
	console.log('wornking on port : ' + port)
});

  let io = require('socket.io')(server); 
  routes(app,express , io);
  
  io.on('connection', function (socket) {
    count++;
    console.log(count + "  active socket",socket.id)
  //testing socket ;
      // socket.broadcast.emit('news', data);//broadcast data to all sockets expect the sender;
     // io.sockets.emit('news',data);//sending data to all sockes
      
      
    
  ///count socket connected  
    socket.on('disconnect', function () {
      count--;
      console.log(count + "active socket")
    });
  });
  
  
  
  //=============================================================================
  /*								Database									 */
  //=============================================================================
  let mongoURI = process.env.MONGODB_URI  || 'mongodb://localhost/guessGame';
  
	mongoose.connect(mongoURI);
	db = mongoose.connection;
  
	db.once('open',function () {
		console.log('mongoDB Working');
	});
  
  
  
  
  