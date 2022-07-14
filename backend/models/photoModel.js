const mongoose = require('mongoose')

const photographerSchema = mongoose .Schema ({
    name: {
        type:String,
        require:[true,'please add a name']
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
    password2: {
        type:String,
        require:[true,'please add a password']
    },
    // Phonenumber: {
    //     type:Number,
    //     // require:[true,'please add a phonenumber']
    // },
    image: {
        type:String,
        require:[true,'please add a image']
    },
    message: {
        type:String,
        require:[true,'please add a message']
    },
    address: {
        type:String,
        require:[true,'please add a address']
    },
    city: {
        type:String,
        require:[true,'please add a city']
    },
    state: {
        type:String,
        require:[true,'please add a state']
    },
    category: {
        type:Array,
        require:[true,'please add a category']
    },
 

},
{
    timestamps: true
})

module.exports = mongoose.model('Photographer',photographerSchema)