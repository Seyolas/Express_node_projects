const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors/custom-error')


const login = async (req,res)=>{
    // mongoose
    // joi
    // check in controller


    const id = new Date().getDate()
    
    const {username,password} =req.body;
    if (!username || !password) {
        throw new CustomAPIError('Please Provide email and password',400);
    }
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    res.status(200).json({msg:'user created',token})
}

const dashboard = async (req,res)=>{

    const authHeader = req.headers.authorization;
    console.log(req.headers);
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new CustomAPIError('No Token provieded',401)
    }
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, Seyolas `,secret: `Here is your 
    authorized data, your lucky number is ${luckyNumber}`})
}

module.exports = {
    login,
    dashboard
}