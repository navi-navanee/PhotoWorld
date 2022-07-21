
const express = require('express')
const router =express.Router()
const {registerUser,loginUser,filterData} = require('../controllers/user/login/userController')
const {userProtect} = require('../middleware/authMiddleware')


router.post('/',loginUser)
router.post('/register',registerUser)
router.get('/filter',userProtect,filterData)

module.exports = router