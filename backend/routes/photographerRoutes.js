const express=require('express')
const router =express.Router()
const {registerPhoto,loginPhoto} = require('../controllers/photographer/login/photoController')

router.post('/register',registerPhoto)
router.post('/login',loginPhoto)


module.exports =router