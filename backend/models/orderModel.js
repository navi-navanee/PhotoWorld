const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
    isPaid:Boolean,
    amount:Number,
    email:String,
    status:String,
    razorpay: {
        orderId : String,
        paymentId: String,
        signature : String,
    },
},
{ timestamps: true }
)

module.exports =mongoose.model('Order',OrderSchema)