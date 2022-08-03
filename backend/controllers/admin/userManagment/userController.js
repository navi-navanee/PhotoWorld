const asyncHandler =require('express-async-handler')
const User =require('../../../models/userModel')
const Order=require('../../../models/orderModel')

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


// @desc  edit the users
// @rout  PUT /api/admin/edit-user/:id
const editUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId)
      if(user) {
       const newUser =  await User.updateOne({_id:userId},
            {status:!user.status})
      }
      res.status(200).json("user Status Changed")
    } catch (error) {
      res.status(400).json(error);
    }
  });

  // transactions

const transaction=asyncHandler(async(req,res)=> {
  const payment=await Order.find()
  console.log("im the payemntt",payment);
  if(payment){
      res.json(payment)
      console.log("i sssss",payment);
  }else{
      res.status(400)
      throw new Error ('no user find')
  }
})



module.exports ={
    getUser,
    editUser,
    transaction
}