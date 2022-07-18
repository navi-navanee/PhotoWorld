const express=require('express')
const router =express.Router()
const {registerPhoto,loginPhoto, details} = require('../controllers/photographer/login/photoController')
const  {protect}  = require('../middleware/authMiddleware')

router.post('/register',registerPhoto)
router.post('/login',loginPhoto)
router.get('/details',protect,details)


module.exports =router