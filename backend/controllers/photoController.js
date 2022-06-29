const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Photographer = require('../models/photoModel')

//Authenticating the Photographer

const registerPhoto = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please add all field')
    }

    //check the photographer alredy exist
    const photographerExist = await Photographer.findOne({ email })
    if (photographerExist) {
        res.status(400)
        throw new Error('Phtographer alredy exist')
    }
    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)

    //create the new Photographer

    const photo = await Photographer.create({
        name,
        email,
        password:hashpassword
    })

    if (photo) {
        res.status(201).json({
            _id: photo.id,
            name: photo.name,
            email: photo.email,
            token: generateToken(photo._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid User data')

    }

})


//login
const loginPhoto = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const photographer = await Photographer.findOne({ email })
    if (photographer && (await bcrypt.compare(password, photographer.password))) {
        res.json({
            _id: photographer.id,
            name: photographer.name,
            email: photographer.email,
            token: generateToken(photographer._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid email or password')
    }
})

//Generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerPhoto,
    loginPhoto
}