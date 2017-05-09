const User = require('../../user/userController.js');
const express = require('express');
const Router = express.Router();


Router.route('/test').post( User.signup);


module.exports = Router;
