const Player = require('../../Player/PlayerController.js');
const express = require('express');
const Router = express.Router();


Router.route('/signup').post( Player.signup);
Router.route('/signin').post( Player.signin);
Router.route('/getAll').get(Player.getAll);	

module.exports = Router;
