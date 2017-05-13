let jwt    = require('jsonwebtoken');


module.exports =  function isAuthenticated(req, res, next) {
    
    
    // check header for token 
    let token =  req.headers['my-access-guess-app'];
    
    // decode token
    if (token) {
        
        // verifies secret and checks exp
        jwt.verify(token, "hell of token guess game", function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed  to authenticate token.' });    
                
            } else {
                // if everything is good, save to request for use in other routes
                // req.decoded = decoded;
                next();
            }
        });
        
    } else if (!token){
        // if  no token provided
        return res.status(401).send({ 
            success: false, 
            message: 'Not  Authorized ' 
        });
        
    }
    
}
