const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({
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
	
	
	
})

const User = mongoose.model('User', UserSchema);
module.exports = User;
