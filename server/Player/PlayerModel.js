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
	trophies : { type: String,
				 default: 0 },
	userstats:  {
    gameplayed: { type: String, default: 0  },
    gamewon:    { type: String, default: 0  },
    gamelost:   { type: String, default: 0  }
	
  }
	
	
	
});
var Player = mongoose.model('Player', PlayerSchema);
module.exports = Player;

