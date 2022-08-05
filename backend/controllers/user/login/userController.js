const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../../../models/userModel')
const photoModel = require('../../../models/photoModel')
const albumModel = require('../../../models/albumModel')

// Authenticate a user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phonenumber } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please add all field ')
    }

    //Check if user exists
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User alredy exist')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)

    //create User
    const user = await User.create({
        name,
        email,
        password: hashpassword,
        status: "true",
        profile_image: 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='

    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            status: "true",
            profile_image: 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='
        })
    }

    else {
        res.status(400)
        throw new Error('Invalid User data')

    }

})

//check for the user
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user.status) throw new Error("Blocked by admin")

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            status: user.status,
            profile_image: user.profile_image
        })
    } else {
        res.status(400)
        throw new Error('invalid email or password')
    }
})

//Google login
const googleloginUser = asyncHandler(async (req, res) => {

    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("Please Register")
    }

    if (!user.status) throw new Error("Blocked by admin")

    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            status: user.status,
            profile_image: user.profile_image
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

// @desc  Edit User Details
// @rout  PUT /api/edit-userDetails/:id
const editUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    try {
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            profile_image: req.body.profile_image,
        };
        const user = await User.findByIdAndUpdate(userId, newUserData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });


        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            profile_image: user.profile_image,
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

const deleterUser = asyncHandler(async (req, res) => {
    res.json({ message: 'User registered' })

})

const filterData = asyncHandler(async (req, res) => {
    const photographers = await photoModel.find()
    if (photographers) {
        res.json(photographers)
    } else {
        res.status(400)
        throw new Error('no Photographer')
    }

})

//single photographer

const singlePhotographer = asyncHandler((async (req, res) => {

    const { id } = req.params
    const _id = id
    const singlePhotographers = await photoModel.findOne({ _id })

    if (singlePhotographers) {
        res.json(singlePhotographers)
    } else {
        res.status(400)
        throw new Error('no Photographer')
    }
}))


const singleFetch = asyncHandler((async (req, res) => {
    const { id } = req.params
    const userId = id
    const albums = await albumModel.find({ userId })
    if (albums) {
        res.json(albums)
    } else {
        res.status(400)
        throw new Error('no Photos')
    }
}))

//.........................................................

const wedding = asyncHandler((async (req, res) => {
    const weddingImage = await albumModel.find({ category: "Helooo" })
    if (weddingImage) {
        res.json(weddingImage)
    } else {
        res.status(400)
        throw new Error('no Images')
    }

}))


//.........................................................

const nature = asyncHandler((async (req, res) => {
    const natureImage = await albumModel.find({ category: "Nature" })
    if (natureImage) {
        res.json({ natureImage })
    } else {
        res.status(400)
        throw new Error('no Images')
    }

}))

//................................................

const getPhotographer = asyncHandler(async (req, res) => {
    const { id } = req.query;

    const data = await photoModel.findById(id)
    if (!data) throw new Error(`Couldn't find ${id}`);
    res.status(200).json({
        data,
    });
})

//.................................................

const addReview = asyncHandler(async (req, res) => {
    const {
        userId,
        review,
        star,
        photographerId
    } = req.body
    if (!review || !star) {
        res.status(400)
        throw new Error('please add all field')
    }
    try {
        const newUserData = {
            userId: userId,
            review: review,
            star: req.body.star,
        }
        const photographer = await photoModel.findByIdAndUpdate(
            photographerId,
            { $push: { Review: newUserData } }
        )

    } catch (error) {

    }
})

//.........................................................

const fetchReview = asyncHandler(async (req, res) => {

    const { id } = req.params
    const {Review} = await photoModel.findById(id).populate({
        path:'Review.userId',
        select:{name:1}
       
    })
   
    if (Review) {
        res.json({
            Review
        })
    }
    else {
        albums
    }
})




// const userId =req.photographer._id
// const album = await albumModel.create({
//     image,
//     category,
//     description,
//     userId,
// })





module.exports = {
    registerUser,
    loginUser,
    editUser,
    deleterUser,
    filterData,
    singlePhotographer,
    singleFetch,
    wedding,
    googleloginUser,
    getPhotographer,
    nature,
    addReview,
    fetchReview

}