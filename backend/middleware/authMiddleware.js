const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const photoModel = require('../models/photoModel')

//photographer protect
const protect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get token from header
            token = await req.headers.authorization.split(' ')[1]
            //verify the token
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            //Get user from the token
            req.photographer = await photoModel.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized , no token')
    }
})

//User protect
const userProtect = asyncHandler(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Get token from header
            token = await req.headers.authorization.split(' ')[1]
            //verify the token
            const decoded = await jwt.verify(token, process.env.JWT_SECRET)
            //Get user from the token
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized , no token')
    }
})

module.exports = { protect, userProtect }