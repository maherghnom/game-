let bodyParser = require('body-parser');
let morgan     = require('morgan');

module.exports = function (app, express) {
  // middleware to provide concise output colored by response status for development use
       app.use(morgan('dev'));
  // middleware that only parses urlencoded bodies. This parser accepts only UTF-8 encoding of the body.
	app.use(bodyParser.urlencoded({ extended: true }));

  // middleware that only parses json
 	app.use(bodyParser.json());
	
  // the built in middleware to serve static.
    	app.use(express.static(__dirname + '/../../dist'));


};
