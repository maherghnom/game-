var Game = require('./GameModel.js');
// var player = require('../Player/PlayerModel');
// var mongoose = require ('mongoose');

// var player = mongoose.model('Player')
// var p = require('../Player/PlayerController')



module.exports = {

	start : (req, res) => {
		let gamedata  = req.body.Gdata;
            gamedata.rightAnswer=parseInt(Math.random()*(this.level || 10 )+1);
				console.log(gamedata);
				Game.create(gamedata, (err, data)=> {
					if (err) {
						res.status(500).send(err);
					}else{

						res.json(data);
					}
				});		
	},

  check : (req,res) =>{
 ///FROM DATA user id , game id , username  ,userAnswer
let userid=req.body.Gdata.userid;
let username=req.body.Gdata.username;
let gameid=req.body.Gdata.gameid;
let userA=req.body.Gdata.answer;
///check the answer
 let query = {'_id': gameid};
		
    Game.findOne(query).exec(function(err,data){
		if(err){
		}
		else if (data.rightAnswer === userA){
          
			
	 let doc = { closed: true,winnerId:userid};
	 Game.findOneAndUpdate(query,doc, { "new": true})
       .exec(function(err,data){
        if(err){
          res.json(err)
        }else {
        //   res.json('you won the game')
        }
       })

	 let q = {'_id': userid};
	 console.log(q,'user id')
 	 let d = { trophies:+10};

    //   player.findOneAndUpdate(q,d, { "new": true})
    //   .exec(function(err,data){
    //     if(err){
    //       res.json(err)
    //     }else {
	// 		console.log(data,'in player')
			
	// 		console.log(data,'in player')
			
    //       res.json('you won the game')
    //     }
    //    })

		}else if(data.rightAnswer < userA){
			res.json("higer") ;
		}else {
			res.json('lower') 
		}

	})
},
getgames :  (req, res)=> {
		Game.find({ $where : "this.closed == 'false' " }, (err, game)=>{
			if (err) {
				res.json(err)
			}else{
				res.json(game);
			}
		})
	}
  }

///if right answer  
///close the game in db  and send that its closed to the scond player 
///save the winer id in game object  
// if (x === "right"){

//  	 let doc = { closed: true,winnerId:userid};
// 	 let q = {'_id': userid};
// 	 Game.findOneAndUpdate(query,doc, { "new": true})
//        .exec(function(err,data){
//         if(err){
//           res.json(err)
//         }else {
//           res.json('you won the game')
//         }
//        })
//  	 let d = { trophies:trophies+10 ,winnerId:userid};

//       User.findOneAndUpdate(q,d, { "new": true})
//        .exec(function(err,data){
//         if(err){
//           res.json(err)
//         }else {
//           res.json('you won the game')
//         }
//        })
 
// }
// else if (x === "higer") {
//     res.json('your answer is higher')
// }else {
// 	res.json('your answer is lower')
// }




////increase trophy for winner and decrease trophy for looser



///if wrong 


////if higher send ur answer were high or if lower send your answer were low 



  
//   }











