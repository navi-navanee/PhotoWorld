const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Photographer = require('../../../models/photoModel')
const albumModel = require('../../../models/albumModel')
const User = require('../../../models/userModel')

// @desc  registering a user
// @rout  POST /api/photo/register
const registerPhoto = asyncHandler(async (req, res) => {
    const { name,
        email,
        password,
        overview,
        address,
        city,
        state,
        phonenumber,
        category,
        payment,


    } = req.body
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
    const photographer = await Photographer.create({
        name,
        email,
        password: hashpassword,
        overview,
        address,
        city,
        state,
        category,
        phonenumber,
        payment,
        image: 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=',
        status: true,
    })
    if (photographer) {
        res.status(201).json({
            _id: photographer.id,
            name: photographer.name,
            email: photographer.email,
            image: photographer.image,
            overview: photographer.overview,
            address: photographer.address,
            city: photographer.city,
            phonenumber: photographer.phonenumber,
            state: photographer.state,
            category: photographer.category,
            state: photographer.state,
            token: generateToken(photographer._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid User data')
    }
})

// @desc  login a user
// @rout  POST /api/photo/login
const loginPhoto = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const photographer = await Photographer.findOne({ email })
    if (!photographer.status) throw new Error("Blocked by admin")
    if (photographer && (await bcrypt.compare(password, photographer.password))) {
        res.json({
            _id: photographer.id,
            name: photographer.name,
            email: photographer.email,
            image: photographer.image,
            overview: photographer.overview,
            address: photographer.address,
            city: photographer.city,
            phonenumber: photographer.phonenumber,
            state: photographer.state,
            category: photographer.category,
            state: photographer.state,
            token: generateToken(photographer._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid email or password')
    }
})

// @desc  edit the user
// @rout  POST /api/photo/edit-photographerDetails
const editPhotographer = asyncHandler(async (req, res) => {
    const userId = req.photographer._id;
    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            image: req.body.image,
            overview: req.body.overview,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            category: req.body.category,
            phonenumber:req.body.phonenumber
        };
        const photographer = await Photographer.findByIdAndUpdate(userId, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            _id: photographer.id,
            name: photographer.name,
            email: photographer.email,
            token: generateToken(photographer._id),
            image: photographer.image,
            overview: photographer.overview,
            address: photographer.address,
            city: photographer.city,
            state: photographer.state,
            category: photographer.category,
            phonenumber:photographer.phonenumber
        });
    } catch (error) {
        res.status(400).json(error);
    }
});



//Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

// @desc  showing the details
// @rout  POST /api/photo/details
const details = asyncHandler(async (req, res) => {
    const id = req.photographer._id
    const photographerDetails = await Photographer.findById(id)
    if (photographerDetails) {
        res.json({
            _id: photographerDetails._id,
            name: photographerDetails.name,
            email: photographerDetails.email,
            image: photographerDetails.image,
            overview: photographerDetails.overview,
            address: photographerDetails.address,
            city: photographerDetails.city,
            state: photographerDetails.state,
            category: photographerDetails.category,
            review: photographerDetails.Review,
            phonenumber:photographerDetails.phonenumber

        })
    } else {
        res.status(400)
        throw new Error('cant find the photographer')
    }

})


// @desc  adding photos
// @rout  POST /api/photo/album
const album = asyncHandler(async (req, res) => {
    console.log("helooooooo...", req.body);
    const { image,
        category,
        description
    } = req.body

    if (!image || !category) {
        res.status(400)
        throw new Error('please add all field')
    }
    const userId = req.photographer._id
    console.log("im theeeeeeeeeeeeeee", image,
        category,
        description);
    const album = await albumModel.create({
        image,
        category,
        description,
        userId,

    })
})

// @desc  fetch photos
// @rout  POST /api/photo/fetch
const fetch = asyncHandler(async (req, res) => {
    const userId = req.photographer._id
    const albums = await albumModel.find({ userId })
    if (albums) {
        res.json({
            albums
        })
    }
    else {
        albums
    }
})

// @desc  adding photos
// @rout  POST /api/photo/deletephoto/:id
const deletePhoto = asyncHandler(async (req, res) => {
    const plan = await albumModel.findById(req.params.id)
    if (plan) {
        await plan.remove()
        res.status(200).json({ id: req.params.id })
    } else {
        res.status(400)
        throw new Error("plan not found")
    }
})


// @desc  adding photos
// @rout  POST /api/photo/get-user
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.query;
    const data = await User.findById(id)
    if (!data) throw new Error(`Couldn't find ${id}`);
    res.status(200).json({
        data,
    });
})

// @desc  fetch review
// @rout  POST /api/photo/fetchReview/:id
const fetchReview = asyncHandler(async (req, res) => {
    const { id } = req.params
    const Review = await Photographer.findById(id).populate({
        path: 'Review.userId',
        select: { name: 1 }
    })
    if (Review) {
        res.json({
            Review
        })
    }
    else {
        res.json({
            msg: "no review"
        })
    }
})

module.exports = {
    registerPhoto,
    loginPhoto,
    details,
    album,
    fetch,
    deletePhoto,
    editPhotographer,
    getUser,
    fetchReview
}