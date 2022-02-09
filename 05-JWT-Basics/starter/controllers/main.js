const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')
const {StatusCodes} = require("http-status-codes")
const login = async (req,res)=>{
    // mongoose
    // joi
    // check in controller


    const id = new Date().getDate()
    
    const {username,password} =req.body;
    if (!username || !password) {
        throw new BadRequestError('Please Provide email and password');
    }
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    res.status(StatusCodes.CREATED).json({msg:'user created',token})
}

const dashboard = async (req,res)=>{
    console.log(req.user);
    const luckyNumber = Math.floor(Math.random()*100)
    res.status(StatusCodes.OK).json({msg:`Hello, ${req.user.username} `,secret: `Here is your 
    authorized data, your lucky number is ${luckyNumber}`})

}

module.exports = {
    login,
    dashboard
}