
const express = require('express')
const router =express.Router()
const {registerUser,loginUser,filterData, singlePhotographer, singleFetch, wedding, editUser, googleloginUser, getPhotographer} = require('../controllers/user/login/userController')
const {userProtect} = require('../middleware/authMiddleware')


router.post('/',loginUser)
router.post('/googlelogin',googleloginUser)
router.post('/register',registerUser)
router.put('/edit-userDetails', userProtect,editUser);
router.get('/filter',userProtect,filterData)
router.get('/singleSearch/:id',userProtect,singlePhotographer)
router.get('/singlefetch/:id',userProtect,singleFetch)
router.get('/wedding',wedding)
router.get('/get-photographer',getPhotographer)

module.exports = router