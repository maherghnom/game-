var Game = require('./GameModel.js');
var player = require('../Player/PlayerModel');




module.exports = (io) => {
	return {
		
		start: (req, res) => {
			let gamedata = req.body.Gdata;
			gamedata.rightAnswer = parseInt(Math.random() * (this.level || 20) + 1);
			console.log(gamedata);
			Game.create(gamedata, (err, data) => {
				if (err) {
					res.status(500).send(err);
				} else {
					
					res.json({id:data._id,name:data.gameName});
				}
			});
		},
		
		check: (req, res) => {
			///FROM DATA user id , game id , username  ,userAnswer
			let event = req.body.Gdata.gamename
			// let userid = req.body.Gdata.userid;
			let username = req.body.Gdata.username;
			let gameid = req.body.Gdata.gameid;
			let userA = req.body.Gdata.answer;
			///check the answer
			let query = { '_id': gameid };
			
			Game.findOne(query).exec(function (err, data) {
				if (err) {
				}
				else if (data.rightAnswer === userA) {
					let doc = { closed: true, winnername: username };
					Game.findOneAndUpdate(query, doc, { "new": true })
					.exec(function (err, data) {
						if (err) {
							res.json(err)
						} else {
							io.sockets.emit(event, {username})
							
						}
					})
					
					
					// gamelost:data.userstats})
					let q = { 'username': username };
					let d = {$inc: {gameplayed:1,gamewon:1,trophies:10} };
						
						
						player.findOneAndUpdate(q,d, { "new": true})
						.exec(function(err,data){
							if(err){
								res.json(err)
							}else {
								console.log(data,'in player')
								
								console.log(data,'in player')
								
								res.json('you won the game')
							}
						})
						
					} else if (data.rightAnswer < userA) {
						res.json("the right answer is lower");
						// io.sockets.emit(event, {end:false})
						
					} else {
						// io.sockets.emit(event, {end:false})
						
						res.json("the right answer is higher")
					}
					
				})
			},
			getgames: (req, res) => {
				Game.find({ $where: "this.closed == 'false' " }, (err, game) => {
					if (err) {
						res.json(err)
					} else {
						res.json(game);
					}
				})
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	