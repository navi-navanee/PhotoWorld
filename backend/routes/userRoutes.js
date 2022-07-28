
const express = require('express')
const router =express.Router()
const {registerUser,loginUser,filterData, singlePhotographer, singleFetch} = require('../controllers/user/login/userController')
const {userProtect} = require('../middleware/authMiddleware')


router.post('/',loginUser)
router.post('/register',registerUser)
router.get('/filter',userProtect,filterData)
router.get('/singleSearch/:id',userProtect,singlePhotographer)
router.get('/singlefetch/:id',userProtect,singleFetch)

module.exports = router