const UserRoute = require('./routes/UserRoute.js');
const GameRoute = require('./routes/GameRoute.js');


module.exports = function(app, express) {
	app.use('/api/game', GameRoute); // GametRoute
	app.use('/api/user', UserRoute); // UserRoute
};
