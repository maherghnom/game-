let player = require('./playermodel.js');	
let jwt    = require('jsonwebtoken');


module.exports = {
	///sign uo user here 
	signup : (req, res) => {
		let userData  = req.body.Udata;
		player.findOne({username : userData.username}, (err, existingUser)=>{
			if (existingUser) {
				res.json({message: 'User Exist'});
			}else {
				player.create(userData, (err, data)=> {
					if (err) {
						res.status(500).send(err);
					}else{
						////generate token 
						let token = jwt.sign(data, "hell of token guess game", 
						{expiresIn: "1h"}//1440 // expires in 24 hours
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
		player.findOne({username : req.body.Udata.username}, (err, player) => {
			if (!player) {
				res.json({message: 'User Not Exist'});
			}else{
				
				player.comparePassword(req.body.Udata.password)
				.then(function (isMatch) {
					if (isMatch) {
						let token = jwt.sign(player, "hell of token guess game", 
						{expiresIn: "1h"}//1440 // expires in 24 hours
						);
						res.json({
							token : token,
							username: player.username
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
				
				res.json({gameplayed:data.gameplayed,
					gamewon:data.gamewon,
					gamelost:data.gamelost})
					
					
				}
			})
		},
		lost : (req, res) => {
			let q = { 'username': req.body.Gdata };
			let d = {$inc: {gameplayed:1,gamelost:1} ,
			};
			player.findOneAndUpdate(q,d, { "new": true})
			.exec(function(err,data){
				if(err){
					res.json(err)
				}else {
					res.json("u lost :" + data.gamelost + "games")
				}
			})
		}
		
	}