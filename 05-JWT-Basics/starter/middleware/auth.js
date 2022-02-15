const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');


const authenticationMiddleware = (req,res,next)=>{
   
    const authHeader = req.headers.authorization;
    console.log(req.headers);
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('No Token provieded')
    }
    const token = authHeader.split(' ')[1]
    
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decoded);
       const {id,username} = decoded;
    //    console.log(req);
       req.user = {id,username}
       next()

    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
}

module.exports = authenticationMiddleware
