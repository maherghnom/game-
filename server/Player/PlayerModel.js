var mongoose = require ('mongoose');

var PlayerSchema = new  mongoose.Schema({
	username : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : true
	},
	trophies : { type: Number,
				 default: 0 },
	userstats:  {
    gameplayed: { type: Number, default: 0  },
    gamewon:    { type: Number, default: 0  },
    gamelost:   { type: Number, default: 0  }
	
  }
	
	
	
});
var Player = mongoose.model('Player', PlayerSchema);
module.exports = Player;

