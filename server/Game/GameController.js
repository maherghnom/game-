var Game = require('./GameModel.js');
var player = require('../Player/PlayerModel');




module.exports = (io) => {
	///inject io to chexk if other players solve the game 
	return {
		//// add the db 
		start: (req, res) => {
			let gamedata = req.body.Gdata;
			///putting the right answer that is auto generated;
			gamedata.rightAnswer = parseInt(Math.random() * (this.level || 20) + 1);
			// console.log(gamedata);
			
			Game.create(gamedata, (err, data) => {
				if (err) {
					res.status(500).send(err);
				} else {
					
					res.json({id:data._id,name:data.gameName});
				}
			});
		},
		
		check: (req, res) => {
			///FROM DATA gamename , game id , username  ,userAnswer
			let event = req.body.Gdata.gamename
			////the event is the game name to broadcast to all user if someone won the game 
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
					
					
					// update the winner stats here 
					let q = { 'username': username };
					let d = {$inc: {gameplayed:1,gamewon:1,trophies:10} };
					
					
					player.findOneAndUpdate(q,d, { "new": true})
					.exec(function(err,data){
						if(err){
							res.json(err)
						}else {
							
							
							
							res.json('you won the game')
						}
					})
					
				} else if (data.rightAnswer < userA) {
					res.json("the right answer is lower");
					
				} else {
					
					res.json("the right answer is higher")
				}
				
			})
		},
		/// get games available to join where closed is false 
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










