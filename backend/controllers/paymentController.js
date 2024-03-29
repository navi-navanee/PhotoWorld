const asyncHandler = require('express-async-handler')
const Razorpay = require('razorpay');
const orderModel = require('../models/orderModel');

// @desc  get razorpay key
// @rout  POST /api/payment/get-rozerpay-key
const razorkey = asyncHandler((async (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
}))

// @desc  create razorpay key
// @rout  POST /api/payment/create-order
const createOrder = asyncHandler(async (req, res) => {

  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
      amount: req.body.amount,
      currency: 'INR',
    };

    const order = await instance.orders.create(options);
    if (!order) return res.status(500).send('Some error occured');
    res.status(200).json({ order });
  } catch (error) {

    res.status(500)
    throw new Error(error)
  }
});

// @desc  Verify Rayzorpayment
// @rout    POST /api/payment/pay-order
const payorder = asyncHandler(async (req, res) => {
  try {
    const {
      amount,
      email,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaysignature
    } = req.body;

    const newPayment = orderModel({
      isPaid: true,
      amount: amount / 100,
      email: email,
      razorpay: {
        orderId: razorpayPaymentId,
        paymentId: razorpayOrderId,
        signature: razorpaysignature
      }
    });
    await newPayment.save();
    res.status(200).json({
      status: true,
      message: "Payment Success... ",
    });
  } catch (error) {
    res.status(400)
    throw new Error("payment failed")
  }
});

module.exports = {
  razorkey,
  createOrder,
  payorder
}
