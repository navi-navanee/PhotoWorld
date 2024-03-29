const mongoose = require('mongoose')

const userSchema = mongoose .Schema ({
    name: {
        type:String,
        require:[true,'please add a name']
    },
    email: {
        type:String,
        require:[true,'please add an email'],
        unique:true
    },
    profile_image:{
        type:String,
    },
    password: {
        type:String,
        require:[true,'please add a password']
    },
    phonenumber: {
        type:String,
    },
    password2: {
        type:String,
        require:[true,'please add a password']
    },
    status: {
       type:Boolean,
    },
    profile_image: {
        type : String,
    }

},
{
    timestamps: true
})

module.exports = mongoose.model('User',userSchema)