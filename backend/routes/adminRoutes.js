const express = require ('express')
const router =express.Router()
const { registerAdmin,loginAdmin } = require('../controllers/adminController')


router.post('/register',registerAdmin)
router.post('/login',loginAdmin)
// router.get('/getUser',getUser)


module.exports =router

