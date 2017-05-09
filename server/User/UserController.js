var userModel = require('./userModel.js');



module.exports = {

	signup : (req, res) => {
		let userData  = req.body.Udata;
		userModel.findOne({username : userData.username}, (err, userEX)=>{
			if (userEX) {
				console.log(userEX)
				res.json({isUserExist : true })
			}else {
				console.log("error")
				userModel.create(userData, (err, data)=> {
					if (err) {
						res.status(500).send(err);
					}else{

						res.json(data);
					}
				});
			}
		})
	},





	signin : (req, res) => {
		userModel.findOne({email : req.body.email}, (err, user) => {
			if (!user) {
				res.json({isUser : false});
			}else{
				if(user.password === req.body.password){
					var token = jwt.encode(user, 'secret');
					res.setHeader('x-access-token',token);
					res.json({token: token, id : user._id, userName : user.firstName + " " + user.lastName});
				}else{
					res.json({isValidPass : false});
				}
			}
		})
	},




	getAll : (req, res)=> {
		userModel.find({}, (err, user)=>{
			if (!user) {
				res.json("user not found")
			}else{
				res.json(user);
			}
		})
	}
}
