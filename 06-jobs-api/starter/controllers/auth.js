const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require("../errors")

const register = async (req, res) => {

  // YOU CAN DO THE LOGIC IN HERE LIKE THAT
  
  // const {name,email,password} = req.body;
  // if (!name || !email || !password) {
  //   throw new BadRequestError('Please provide name email password')
  // }


  // YOU CAN HASH THE PASSWORD LIKE THAT
  // const {name,email,password} = req.body;
  // const salt = await bcrypt.genSalt(5);
  // const hashedPassword = await bcrypt.hash(password,salt)
  // const tempUser = {name,email,password:hashedPassword}

  const user = await User.create({...req.body})
  // const token = jwt.sign({userId:user._id,name:user.name},'jwtSecret',{expiresIn:'30d'})
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({user:{name:user.name},token})
}

  
const login = async (req, res) => {

  const {email,password} = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({email})

  if(!user){
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)

  if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid Credentials')
  }
  

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({user:{name:user.name},token})

}

module.exports = {
  register,
  login
}
