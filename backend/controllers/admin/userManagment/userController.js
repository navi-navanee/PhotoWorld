const asyncHandler =require('express-async-handler')
const User =require('../../../models/userModel')

//userlist fetching

const getUser=asyncHandler(async(req,res)=> {
    const user=await User.find()
    console.log(user);
    if(user){
        res.json(user)
    }else{
        res.status(400)
        throw new Error ('no user find')
    }
})


module.exports ={
    getUser
}