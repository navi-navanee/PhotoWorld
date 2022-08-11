const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../../../models/adminModel')

// @desc  registering admin
// @rout  POST /api/admin/register
const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        throw new Error("please enter all field")

    }

    //Hash password

    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)

    //create Admin
    const admin = await Admin.create({
        name,
        email,
        password: hashpassword,

    })
    if (admin) {
        res.status(201).json({
            id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

//Generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
// @desc  registering admin
// @rout  POST /api/admin/login
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const admin = await Admin.findOne({ email })
    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.json({
            _id: admin.id,
            name: admin.name,
            email: admin.email,
            token: generateToken(admin._id)
        })
    }
    else {
        res.status(400)
        throw new Error('invalid email or password')
    }
})

module.exports = {
    registerAdmin,
    loginAdmin
}