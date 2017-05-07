var express  = require('express');
var mongoose = require('mongoose');
var routes   = require('./config/routes');
var mw       = require('./config/middleware');


//=============================================================================
/*									Server   								 */
//=============================================================================
var app  = express();
mw(app,express);
routes(app,express);
//set express to listen to for requests or certain port
app.use(express.static('client'));
const port = process.env.PORT || 1020;
app.listen(port,function(){
	console.log('wornking on port : ' + port)
 });
