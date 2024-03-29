const express=require('express')
const router =express.Router()
const {registerPhoto,loginPhoto, details, album, fetch, deletePhoto, editPhotographer, getUser, fetchReview} = require('../controllers/photographer/login/photoController')
const  {protect}  = require('../middleware/authMiddleware')

router.post('/register',registerPhoto)
router.post('/login',loginPhoto)
router.put('/edit-photographerDetails', protect,editPhotographer);
router.get('/details',protect,details)
router.post('/albums',protect,album)
router.get('/fetch',protect,fetch)
router.delete('/deletephoto/:id',protect,deletePhoto)
router.get('/get-user',getUser)
router.get('/fetchReview/:id',protect,fetchReview)


module.exports =router

