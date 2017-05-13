let Player = require('../Player/PlayerController.js');
let Game = require('../Game/GameController.js');
let isAuthenticated = require('./auth')

module.exports = function(app, express, io) {
	
	Game = Game(io);
	
	////game route	
	app.post('/api/game/start' , isAuthenticated , Game.start);
	app.post('/api/game/check' , isAuthenticated , Game.check);
	app.get('/api/game/all'    , isAuthenticated, Game.getgames);
	
	//// player route
	app.post('/api/user/signup' , Player.signup);
	app.post('/api/user/signin' , Player.signin);
	app.get('/api/user/stats/:username' , isAuthenticated , Player.getstats);
	
	
	
	
	
};
