const express = require('express')
const router =express.Router()
const {registerUser,loginUser,editUser,deleterUser} = require('../controllers/userController')


router.post('/',loginUser)
router.post('/register',registerUser)
router.put('/:id',editUser)
router.delete('/:id',deleterUser)

module.exports = router