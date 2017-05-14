let jwt    = require('jsonwebtoken');


module.exports =  function isAuthenticated(req, res, next) {
    
    
    // check header for token 
    let token =  req.headers['my-access-guess-app'];

    if (token) {
        
        // verifies secret and checks exp if verified token go ahead if else sen not autherized 
        jwt.verify(token, "hell of token guess game", function(err, decoded) {      
            if (err) {
                console.log(token)
                // return res.json({ success: false, message: 'Failed  to authenticate token.' });
                        return res.status(401).send({ 
            success: false, 
            message: 'Token not autherized' 
        });    
                
            } else {
                // if everything is good, save to request for use in other routes
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
