const asyncHandler =require('express-async-handler')
const User =require('../../../models/userModel')
const Order=require('../../../models/orderModel')
const Photographer=require('../../../models/photoModel')
const orderModel = require('../../../models/orderModel')

//userlist fetching

const getUser=asyncHandler(async(req,res)=> {
    const user=await User.find()
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



  //.........................
  
const getPhotographer=asyncHandler(async(req,res)=> {
  const user=await Photographer.find()
  if(user){
      res.json(user)
  }else{
      res.status(400)
      throw new Error ('no user find')
  }
})


// @desc  edit the users
// @rout  PUT /api/admin/edit-user/:id
const editPhtographer = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await Photographer.findById(userId)

    if(user) {
     const newUser =  await Photographer.updateOne({_id:userId},
          {status:!user.status})
    }
    res.status(200).json("user Status Changed")
  } catch (error) {
    res.status(400).json(error);
  }
});

  // transactions

const transaction=asyncHandler(async(req,res)=> {
  const payment=await Order.find().sort({ $natural: -1 }).limit(5);
  if(payment){
      res.json(payment)
  }else{
      res.status(400)
      throw new Error ('no user find')
  }
})



//TOTAL USERS COUNT

const usersCount=asyncHandler(async(req,res)=>{
  const Count=await User.count()
  if(Count){
    res.json(Count)
  }
})

//TOTAL USERS PHOTOGRAPHER

const photographerCount=asyncHandler(async(req,res)=>{
  const Count=await Photographer.count()
  if(Count){
    res.json(Count)
  }else{
    res.json("no users")
  }
})
//TOTAL USERS INCOME

const totalIncome=asyncHandler(async(req,res)=>{
  const [{ amount }] = await Order.aggregate([
    { $group: { _id: null, amount: { $sum: '$amount' } } },
    { $project: { _id: 0, amount: 1 } },
  ]);

  res.json(amount)

})



module.exports ={
    getUser,
    editUser,
    transaction,
    usersCount,
    photographerCount,
    getPhotographer,
    editPhtographer,
    totalIncome
}