var bodyParser = require('body-parser');
var morgan     = require('morgan');

module.exports = function (app, express) {
  //use middleware to provide concise output colored by response status for development use
    // app.use(morgan('dev'));
  //use middleware that only parses urlencoded bodies. This parser accepts only UTF-8 encoding of the body.
	app.use(bodyParser.urlencoded({ extended: true }));

  //use middleware that only parses json
 	app.use(bodyParser.json());
	
  //use the built in middleware to serve static files such as images, CSS files, and JavaScript files.
    	app.use(express.static(__dirname + '/../../dist'));


};
