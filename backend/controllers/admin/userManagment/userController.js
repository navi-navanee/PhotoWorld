const asyncHandler = require('express-async-handler')
const User = require('../../../models/userModel')
const Order = require('../../../models/orderModel')
const Photographer = require('../../../models/photoModel')
const orderModel = require('../../../models/orderModel')

// @desc  registering admin
// @rout  POST /api/admin/getUser
const getUser = asyncHandler(async (req, res) => {
  const user = await User.find()
  if (user) {
    res.json(user)
  } else {
    res.status(400)
    throw new Error('no user find')
  }
})

// @desc  edit the users
// @rout  PUT /api/admin/blockuser/:id
const editUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId)
    if (user) {
      const newUser = await User.updateOne({ _id: userId },
        { status: !user.status })
    }
    res.status(200).json("user Status Changed")
  } catch (error) {
    res.status(400).json(error);
  }
});

// @desc  registering admin
// @rout  POST /api/admin/getPhotographer
const getPhotographer = asyncHandler(async (req, res) => {
  const user = await Photographer.find()
  if (user) {
    res.json(user)
  } else {
    res.status(400)
    throw new Error('no user find')
  }
})

// @desc  registering admin
// @rout  POST /api/admin/payment
const fetchPayment = asyncHandler(async (req, res) => {
  const data = await orderModel.find()
  console.log("mahnnnnnn", data);
  if (data) {
    res.json(data)
  } else {
    res.status(400)
    throw new Error('no user find')
  }
})

// @desc  block/unblock the user
// @rout  POST /api/admin/blockphotographer/:id
const editPhtographer = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Photographer.findById(userId)
    if (user) {
      const newUser = await Photographer.updateOne({ _id: userId },
        { status: !user.status })
    }
    res.status(200).json("user Status Changed")
  } catch (error) {
    res.status(400).json(error);
  }
});

// @desc  block//unblock the user
// @rout  POST /api/admin/transaction
const transaction = asyncHandler(async (req, res) => {
  const payment = await Order.find().sort({ $natural: -1 }).limit(5);
  if (payment) {
    res.json(payment)
  } else {
    res.status(400)
    throw new Error('no user find')
  }
})

// @desc total user count
// @rout  POST /api/admin/userCount
const usersCount = asyncHandler(async (req, res) => {
  const Count = await User.count()
  if (Count) {
    res.json(Count)
  }
})

// @desc  total photographer
// @rout  POST /api/admin/photographer
const photographerCount = asyncHandler(async (req, res) => {
  const Count = await Photographer.count()
  if (Count) {
    res.json(Count)
  } else {
    res.json("no users")
  }
})

// @desc  total income
// @rout  POST /api/admin/userCount
const totalIncome = asyncHandler(async (req, res) => {
  const [{ amount }] = await Order.aggregate([
    { $group: { _id: null, amount: { $sum: '$amount' } } },
    { $project: { _id: 0, amount: 1 } },
  ]);
  res.json(amount)
})

module.exports = {
  getUser,
  editUser,
  transaction,
  usersCount,
  photographerCount,
  getPhotographer,
  editPhtographer,
  totalIncome,
  fetchPayment
}