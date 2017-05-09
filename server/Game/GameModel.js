const mongoose = require ('mongoose');

const GameSchema = new mongoose.Schema({
	player1 : {
     id: { type: String  },
    name:    { type: String},
    type:{ type: String}//distinguish between human player and our robot //// 
    },
	player2 : {
    id: { type: String  },
    name:{ type: String},
    type:{ type: String}//distinguish between human player and our robot //// 
	
	},
	rightAnswer : {
          type: String, default: 0  
        },
    closed : {
          type: String, default: false  
        
        },
            winnerId : {
          type: String, default: 0  
         
        
            }
	
})

const Game = mongoose.model('Game', GameSchema);
module.exports = Game;

