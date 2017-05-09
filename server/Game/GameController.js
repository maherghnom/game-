const Game = require('./GameModel.js');
 var user = require('../User/UserModel.js');



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
let userid=req.body.Gdata.auserid;
let username=req.body.Gdata.username;
let gameid=req.body.Gdata.gameid;
let userA=req.body.Gdata.answer;
///check the answer
 let query = {'_id': gameid};
		console.log(req.body.Gdata,"----------------")
		console.log(query,"----------------")
		
    Game.findOne(query).exec(function(err,data){
		console.log(data);
		console.log(userA,"asfjksgdk");
		console.log(gameid,"asfjksgdk");
		
		
		if(err){

		}
		else if (data.rightAnswer === userA){
          res.json('you won the game')
			
	 let doc = { closed: true,winnerId:userid};
	 Game.findOneAndUpdate(query,doc, { "new": true})
       .exec(function(err,data){
        if(err){
          res.json(err)
        }else {
			console.log(data)
          res.json('you won the game')
        }
       })

	 let q = {'_id': userid};
	 console.log(q)
 	 let d = { trophies:trophies+10};

      user.findOneAndUpdate(q,d, { "new": true})
       .exec(function(err,data){
        if(err){
          res.json(err)
        }else {
			console.log(data)
			
          res.json('you won the game')
        }
       })

		}else if(data.rightAnswer < userA){
			res.json("higer") ;
		}else {
			res.json('lower') 
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











