const mongoose = require ('mongoose');

const GameSchema = new mongoose.Schema({
    
	rightAnswer : {
        type: String, default: 0  
    },
    closed : {
        type: String, default: false  
    },
    winnername : {
        type: String, default: 0  
    },
    gameName : {
        type : String,
		required : true 
    },
    playerIn :  [{
        playerName: {type : String}
    }] 
	
})

const Game = mongoose.model('Game', GameSchema);
module.exports = Game;

