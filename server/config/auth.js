let jwt    = require('jsonwebtoken');


module.exports =  function isAuthenticated(req, res, next) {
    
    
    // check header or url parameters or post parameters for token
    var token =  req.headers['my-access-guess-app'];
    
    
    
    
    // decode token
    if (token) {
        
        // verifies secret and checks exp
        jwt.verify(token, "hell of token guess game", function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed  to authenticate token.' });    
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                console.log(decoded,"in auth data")    
                next();
            }
        });
        
    } else {
        
        // if  no token provided
        
        return res.status(401).send({ 
            success: false, 
            message: 'Not  Authorized ' 
        });
        
    }
    
}
