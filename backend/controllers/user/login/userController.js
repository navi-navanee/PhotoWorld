const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../../../models/userModel')
const photoModel = require('../../../models/photoModel')
const albumModel = require('../../../models/albumModel')


// @desc  registering a user
// @rout  POST /api/user/register
const registerUser = asyncHandler(async (req, res) => {
    const { name, email,password,phonenumber } = req.body
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
        phonenumber,
        status: "true",
        profile_image: 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='
    })
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phonenumber:user.phonenumber,
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

// @desc  login for user
// @rout  POST /api/user/
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
            profile_image: user.profile_image,
            phonenumber:user.phonenumber
        })
    } else {
        res.status(400)
        throw new Error('invalid email or password')
    }
})

// @desc  login with google
// @rout  POST /api/user/googlelogin

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
// @rout  PUT /api/user/edit-userDetails/:id
const editUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    try {
        console.log("im req",req.body);
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            profile_image: req.body.profile_image,
            phonenumber:req.body.phonenumber
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

// @desc  filtering the data
// @rout  PUT /api/user/filter
const filterData = asyncHandler(async (req, res) => {
    const photographers = await photoModel.find()
    if (photographers) {
        res.json(photographers)
    } else {
        res.status(400)
        throw new Error('no Photographer')
    }

})

// @desc  finding the selected photographer
// @rout  PUT /api/user/singleSearch/:id
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

// @desc  finding the selected photographer
// @rout  PUT /api/user/singlefetch/:id
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

// @desc  wedding category sorting
// @rout  PUT /api/user/wedding
const wedding = asyncHandler((async (req, res) => {
    const weddingImage = await albumModel.find({ category: "wedding" })
    if (weddingImage) {
        res.json(weddingImage)
    } else {
        res.status(400)
        throw new Error('no Images')
    }
}))

// @desc  wedding category sorting
// @rout  PUT /api/user/nature
const nature = asyncHandler((async (req, res) => {
    const natureImage = await albumModel.find({ category: "Nature" })
    if (natureImage) {
        res.json({ natureImage })
    } else {
        res.status(400)
        throw new Error('no Images')
    }

}))

// @desc  getphotographer from category
// @rout  PUT /api/user/get-photographer
const getPhotographer = asyncHandler(async (req, res) => {
    const { id } = req.query;
    const data = await photoModel.findById(id)
    if (!data) throw new Error(`Couldn't find ${id}`);
    res.status(200).json({
        data,
    });
})

// @desc  add review in profile
// @rout  PUT /api/user/addReview
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
            date: new Date()
        }
        const photographer = await photoModel.findByIdAndUpdate(
            photographerId,
            { $push: { Review: newUserData } }
        )

    } catch (error) {

    }
})
// @desc  list the added review
// @rout  PUT /api/user/fetchReview
const fetchReview = asyncHandler(async (req, res) => {

    const { id } = req.params
    const { Review } = await photoModel.findById(id).populate({
        path: 'Review.userId',
        select: { name: 1 }
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

// @desc  like the photo
// @rout  PUT /api/user/like
const like = asyncHandler(async (req, res) => {
    const {
        _id,
        userId,
    } = req.body
    try {
        const post = await albumModel.findById(_id)
        if (post.likes.includes(userId)) {
            return res.json(403).json({ msg: "post already liked" })
        }
        const liked = await albumModel.findByIdAndUpdate(_id, {
            $push: { likes: userId }
        })
        res.json({ liked })
    } catch (error) {
        res.status(400).json(error)
    }
});

// @desc  like the photo
// @rout  PUT /api/user/unlike
const unlike = asyncHandler(async (req, res) => {
    const {
        _id,
        userId,
    } = req.body
    try {
        const newUserData = {
            user: userId,
        }
        const post = await albumModel.findById(_id)
        if (post.likes.includes(userId)) {
            const unliked = await albumModel.findByIdAndUpdate(_id, {
                $pull: { likes: userId }
            })

            res.json({ unliked })
        } else {
            return res.json({ msg: "Please add like" })
        }
    } catch (error) {
        res.status(400).json(error)
    }
});

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
    fetchReview,
    like,
    unlike

}