const Game = require('../../Game/GameController.js');
const express = require('express');
const Router = express.Router();


Router.route('/start').post( Game.start);
Router.route('/check').post( Game.check);



module.exports = Router;
