const asyncHandler = require('express-async-handler')
const Razorpay = require('razorpay');
const orderModel = require('../models/orderModel');


//get razorpay key

const razorkey =asyncHandler((async(req,res)=>{
  console.log("im in herrrrrrrrrrrrrrrrrrrrrrrr");
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
}))

//create Order
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
      console.log("im the order",order.amount);
      if (!order) return res.status(500).send('Some error occured');
      res.status(200).json({order});
   } catch (error) {
  
    res.status(500)
    throw new Error (error) 
   }
  });

  //payorder

  // @desc    Verify Rayzor payment
// @rout    POST /api/payment/verify-payment
const payorder = asyncHandler(async (req, res) => {

  console.log("im payy",req.body);
  try {
    const {
        amount,
        email,
        razorpayPaymentId,
        razorpayOrderId,
        razorpaysignature
    } = req.body;

      const newPayment = orderModel({
        isPaid:true,
        amount:amount,
        email:email,
        razorpay: {
            orderId: razorpayPaymentId,
            paymentId: razorpayOrderId,
            signature:razorpaysignature
        }
      });
      await newPayment.save();
  console.log("payment success");
      res.status(200).json({
        status: true,
        message: "Payment Success... ",
      });

  } catch (error) {
    res.status(400)
    throw new Error ("payment failed")  
  }
 });
  

module.exports ={
    razorkey,
    createOrder,
    payorder
}
