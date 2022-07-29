const express=require('express')
const router =express.Router()
const {registerPhoto,loginPhoto, details, album, fetch, deletePhoto} = require('../controllers/photographer/login/photoController')
const  {protect}  = require('../middleware/authMiddleware')

router.post('/register',registerPhoto)
router.post('/login',loginPhoto)
router.get('/details',protect,details)
router.post('/albums',protect,album)
router.get('/fetch',protect,fetch)
router.delete('/deletephoto/:id',protect,deletePhoto)

module.exports =router