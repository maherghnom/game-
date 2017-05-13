let player = require('./playermodel.js');	
let jwt    = require('jsonwebtoken');

module.exports = {
	
	signup : (req, res) => {
		let userData  = req.body.Udata;
		player.findOne({username : userData.username}, (err, existingUser)=>{
			if (existingUser) {
				res.status(422).send({message: 'User Exist'});
			}else {
				player.create(userData, (err, data)=> {
					if (err) {
						res.status(500).send(err);
					}else{
						let token = jwt.sign(data, "hell of token guess game", 
						{expiresIn: 1000}//1440 // expires in 24 hours
						);
						
						res.json({
							token : token,
							username: data.username,
							message: 'User Activated' 
							
						});
						
						
						
					}
				});
			}
		})
	},
	
	
	
	
	
	signin : (req, res) => {
		let username = req.body.username;
		
		player.findOne({username : req.body.username}, (err, player) => {
			if (!player) {
				res.status(422).send({message: 'User Not Exist'});
			}else{
				
				player.comparePassword(req.body.password)
				.then(function (isMatch) {
					if (isMatch) {
						let token = jwt.sign(data, "hell of token guess game", {
							expiresInMinutes:  1440 // expires in 24 hours
						});
						
						res.json({
							token : token,
							expires: expires,
							username: data.username
						});
					} else {
						res.json({message :"password not matched"})
					}
				});
			}
		})
	},
	
	
	
	
	getAll : (req, res)=> {
		player.find({} , (err, user)=>{
			if (!user) {
				res.json("user not found")
			}else{
				res.json(user);
			}
		})
	},
	
	getstats : (req, res) => {
		player.findOne({'username': req.params.username}, (err, data)=>{
			if (!data) {
				res.json({isUserExist : false })
			}else {
				res.json(data.userstats)
				
				
			}
		})
	}
}
