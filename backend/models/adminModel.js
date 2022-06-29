
const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name:{
        type: String,
        require:[true,'please enter your user name']
    },
    email: {
        type:String,
        require:[true,'please add an email'],
        unique:true
    },
    password: {
        type:String,
        require:[true,'please add a password']
    },
})

module.exports =mongoose.model('Admin',adminSchema)