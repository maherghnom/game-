let Player = require('../Player/PlayerController.js');
let Game = require('../Game/GameController.js');
let isAuthenticated = require('./auth')

module.exports = function(app, express, io ) {
	
	Game = Game(io);
	
	////game route	

	//start the game 
	app.post('/api/game/start' , isAuthenticated , Game.start);
	///check answer 
	app.post('/api/game/check' ,isAuthenticated, Game.check);
	///get all games not closed
	app.get('/api/game/all'    , isAuthenticated, Game.getgames);
	
	
	//// player route

	///register
	app.post('/api/user/signup' , Player.signup);
	app.post('/api/user/signin' , Player.signin);
	//// increase lost games if other player guessed first;
	app.post('/api/user/lost' , isAuthenticated, Player.lost);

	///get player stats ;
	app.get('/api/user/stats/:username' , isAuthenticated , Player.getstats);
	
	
	
	
	
	
};
