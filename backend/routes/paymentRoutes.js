const express = require('express')
const router =express.Router()
const { razorkey, createOrder, payorder } = require('../controllers/paymentController')


router.get('/get-rozerpay-key',razorkey)
router.post('/create-order',createOrder)
router.post('/pay-order',payorder)

module.exports =router
