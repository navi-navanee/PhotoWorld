const express = require ('express')
const router =express.Router()
const { registerAdmin,loginAdmin } = require('../controllers/admin/login/adminController')
const { getUser, editUser, transaction } = require('../controllers/admin/userManagment/userController')

router.post('/register',registerAdmin)
router.post('/login',loginAdmin)
router.get('/getUser',getUser)
router.patch('/blockuser/:id',editUser)
router.get('/transaction',transaction)



module.exports =router

