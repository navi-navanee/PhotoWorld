const express = require ('express')
const router =express.Router()
const { registerAdmin,loginAdmin } = require('../controllers/admin/login/adminController')
const { getUser, editUser, transaction, usersCount,
     photographerCount, getPhotographer,
      editPhtographer, totalIncome, fetchPayment } = require('../controllers/admin/userManagment/userController')

router.post('/register',registerAdmin)
router.post('/login',loginAdmin)
router.get('/getUser',getUser)
router.patch('/blockuser/:id',editUser)
router.get('/getPhotographer',getPhotographer)
router.patch('/blockphotographer/:id',editPhtographer)
router.get('/payment',fetchPayment)
router.get('/transaction',transaction)
router.get('/usersCount',usersCount)
router.get('/photographerCount',photographerCount)
router.get('/totalIncome',totalIncome)

module.exports =router

