const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Photographer = require('../../../models/photoModel')

//Authenticating the Photographer

const registerPhoto = asyncHandler(async (req, res) => {
    const { name, 
        email, 
        password , 
        image,
        overview,
        address,
        city,
        state,
        category } = req.body

    console.log("bodyy",req.body);
    

    if (!name || !email || !password) {
        res.status(400)
        console.log("register called");
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
        password:hashpassword,
        image,
        overview,
        address,
        city,
        state,
        category,
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

//fetching details

const details = asyncHandler(async(req,res) => {

    console.log("called",req.body);
    
    const {id} =req.body

    console.log("im body id...",id);

    const photographerDetails =await Photographer.findById(id)
    if(photographerDetails){
        console.log("im photo",photographerDetails);
        res.json({
            _id:photographerDetails._id,
            name: photographerDetails.name,
            email: photographerDetails.email,
            image:photographerDetails.image,
            overview:photographerDetails.overview,
            address:photographerDetails.address,
            city:photographerDetails.city,
            state:photographerDetails.state,
            category:photographerDetails.category,

        })
    }else{
        res.status(400)
        throw new Error ('cant find the photographer')
    }

})











module.exports = {
    registerPhoto,
    loginPhoto,
    details,
}