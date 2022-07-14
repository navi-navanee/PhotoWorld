const express=require('express')
const router =express.Router()
const {registerPhoto,loginPhoto, details} = require('../controllers/photographer/login/photoController')

router.post('/register',registerPhoto)
router.post('/login',loginPhoto)
router.post('/details',details)


module.exports =router