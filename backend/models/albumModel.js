const mongoose =require('mongoose')
const Schema=mongoose.Schema
const ObjectId=Schema.Types.ObjectId

const albumSchema = mongoose.Schema ({
    description : {
        type:String,
    },
    image: {
        type:String,
        require:true
    },
    category: {
        type:String,
        require:[true]
    },
    like: {
        type:Number,
        default:0
    },
    comment: {
        type:String
    },
    userId: {
        type:ObjectId
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Album',albumSchema)
