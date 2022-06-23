const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// Authenticate a user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phonenumber } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please add all field ')
    }

    //Check if user exists
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User alredy exist')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)

    //create User
    const user = await User.create({
        name,
        email,
        password: hashpassword,
        
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token:generateToken(user._id)
        })
    }

    else {
        res.status(400)
        throw new Error('Invalid User data')

    }

})

const loginUser = asyncHandler(async (req, res) => {
  
    const {email, password} = req.body

//check for the user
  const user =await User.findOne({email})

  if(user && (await bcrypt.compare(password, user.password))){
  res.json({
    _id:user.id,
    name:user.name,
    email:user.email,
    token:generateToken(user._id)
  })
}else{
    res.status(400)
    throw new Error('invalid email or password')
}
})


//Generate JWT

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}





const editUser = asyncHandler(async (req, res) => {
    res.json({ message: 'User edited' })

})

const deleterUser = asyncHandler(async (req, res) => {
    res.json({ message: 'User registered' })

})


module.exports = {
    registerUser,
    loginUser,
    editUser,
    deleterUser
}