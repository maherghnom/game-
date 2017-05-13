let jwt    = require('jsonwebtoken');


module.exports =  function isAuthenticated(req, res, next) {
    
    
    // check header or url parameters or post parameters for token
    let token =  req.headers['my-access-guess-app'];
    
    console.log(token,"lol")
    
    
    // decode token
    if (token) {
        console.log('hell')
        // verifies secret and checks exp
        jwt.verify(token, "hell of token guess game", function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed  to authenticate token.' });    
            } else {
                // if everything is good, save to request for use in other routes
                // req.decoded = decoded;
                console.log("in auth data")    
               return  next();
            }
        });
        
    } else if (!token){
        console.log('what the fuck')
        // if  no token provided
        
        return res.status(401).send({ 
            success: false, 
            message: 'Not  Authorized ' 
        });
        
    }
    
}
