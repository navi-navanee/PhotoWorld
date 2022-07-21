const jwt=require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const photoModel = require('../models/photoModel')


//photographer protect
const protect =asyncHandler(async(req,res,next)=>{
    let token 
    console.log("im headers mahnnn ",req.headers.authorization);
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header
            token =await req.headers.authorization.split(' ')[1]

            console.log("Get token from header",token);

            //verify the token
            const decoded =await jwt.verify(token,process.env.JWT_SECRET)
            console.log("im decode",decoded);
            //Get user from the token
            req.photographer =await photoModel.findById(decoded.id).select('-password')
            console.log("im photographer", req.photographer);
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
            
        }
    }

    if(!token) {
        res.status(401) 
        throw new Error('Not authorized , no token' )
    }
})



//User protect
const userProtect =asyncHandler(async(req,res,next)=>{
    console.log("im hereeeeeeeeeeee");
    let token 
    console.log("im headers User ",req.headers.authorization);
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            //Get token from header
            token =await req.headers.authorization.split(' ')[1]

            console.log("Get usertoken from header",token);

            //verify the token
            const decoded =await jwt.verify(token,process.env.JWT_SECRET)
            console.log("im decode user",decoded);
            //Get user from the token
            req.photographer =await User.findById(decoded.id).select('-password')
            console.log("im USER", req.photographer);
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
            
        }
    }

    if(!token) {
        res.status(401) 
        throw new Error('Not authorized , no token' )
    }
})





module.exports ={ protect,userProtect }