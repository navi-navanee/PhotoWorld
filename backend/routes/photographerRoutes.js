const express=require('express')
const router =express.Router()
const {registerPhoto,loginPhoto} = require('../controllers/photoController')

router.post('/register',registerPhoto)
router.post('/login',loginPhoto)


module.exports =router