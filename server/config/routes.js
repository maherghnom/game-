const PlayerRoute = require('./routes/PlayerRoute.js');
const GameRoute = require('./routes/GameRoute.js');


module.exports = function(app, express) {
	app.use('/api/game', GameRoute); // GametRoute
	app.use('/api/user', PlayerRoute); // PlayerRoute
};
