var mongoose = require ('mongoose');
let bcrypt= require("bcrypt");
var Schema = mongoose.Schema;
var Q = require('q');

var PlayerSchema = new  Schema({
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
  ///hashing password;
  PlayerSchema.pre('save', function (next) {  
    var user = this;
    if ( this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) {
          return next(err);
        }
        bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
        });
      });
    } else {
      return next();
    }
  });
  
  ////compare hased pass and the user entery;
  PlayerSchema.methods.comparePassword =  function (candidatePassword) {
    var savedPassword = this.password;
    return Q.Promise(function (resolve, reject) {
      bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
        if (err) {
          reject(err);
        } else {
          resolve (isMatch);
          
        }
      });
    });
    
  };
  
  let player;
  if (mongoose.models && mongoose.models.Player) player = mongoose.models.Player
  else player = mongoose.model('Player', PlayerSchema);
  module.exports =  player;
  
  