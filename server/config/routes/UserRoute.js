const User = require('../../user/userController.js');
const express = require('express');
const Router = express.Router();


Router.route('/signup').post( User.signup);
Router.route('/signin').post( User.signin);
Router.route('/getAll').get(User.getAll);	

module.exports = Router;
