const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Photographer = require('../../../models/photoModel')
const albumModel = require('../../../models/albumModel')
const User = require('../../../models/userModel')

//Authenticating the Photographer

const registerPhoto = asyncHandler(async (req, res) => {
    const { name, 
        email, 
        password , 
        image,
        overview,
        address,
        city,
        state,
        category,payment } = req.body

    

    if (!name || !email || !password) {
        res.status(400)
        throw new Error('please add all field')
    }

    //check the photographer alredy exist
    const photographerExist = await Photographer.findOne({ email })
    if (photographerExist) {
        res.status(400)
        throw new Error('Phtographer alredy exist')
    }
    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(password, salt)

    //create the new Photographer

    const photo = await Photographer.create({
        name,
        email,
        password:hashpassword,
        image,
        overview,
        address,
        city,
        state,
        category,
        payment,
        status:true,
    })

    if (photo) {
        res.status(201).json({
            _id: photo.id,
            name: photo.name,
            email: photo.email,
            token: generateToken(photo._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Invalid User data')

    }

})


//login
const loginPhoto = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const photographer = await Photographer.findOne({ email })
    if(!photographer.status) throw new Error("Blocked by admin")
    if (photographer && (await bcrypt.compare(password, photographer.password))) {
        res.json({
            _id: photographer.id,
            name: photographer.name,
            email: photographer.email,
            image:photographer.image,
            overview:photographer.overview,
            address:photographer.address,
            city:photographer.city,
            state:photographer.state,
            category:photographer.category,
            state:photographer.state,
            token: generateToken(photographer._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid email or password')
    }
})

// @desc  Edit User Details
// @rout  PUT /api/edit-userDetails/:id
const editPhotographer = asyncHandler(async (req, res) => {
    const userId = req.photographer._id;

    try {
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
        overview:req.body.overview,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        category:req.body.category,
      };
      const photographer = await Photographer.findByIdAndUpdate(userId, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      

      res.status(200).json({
        _id: photographer.id,
        name: photographer.name,
        email: photographer.email,
        token: generateToken(photographer._id),
        image: photographer.image,
        overview: photographer.overview,
        address: photographer.address,
        city: photographer.city,
        state: photographer.state,
        category: photographer.category,
      });
    } catch (error) {
      res.status(400).json(error);
    }
  });



//Generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

//fetching details

const details = asyncHandler(async(req,res) => {
    
    const id =req.photographer._id


    const photographerDetails =await Photographer.findById(id)
    if(photographerDetails){
        res.json({
            _id:photographerDetails._id,
            name: photographerDetails.name,
            email: photographerDetails.email,
            image:photographerDetails.image,
            overview:photographerDetails.overview,
            address:photographerDetails.address,
            city:photographerDetails.city,
            state:photographerDetails.state,
            category:photographerDetails.category,

        })
    }else{
        res.status(400)
        throw new Error ('cant find the photographer')
    }

})


//updating album

const album = asyncHandler(async(req,res)=> {
    const {image,
        category
    } =req.body

    if(!image || !category){
        res.status(400)
        throw new Error('please add all field')
    }
    const userId =req.photographer._id
    const album = await albumModel.create({
        image,
        category,
        userId,
    })
})

//fetching album

const fetch =asyncHandler(async(req,res) => {
    const userId =req.photographer._id

    const albums=await albumModel.find({userId})
    if(albums){
        res.json({
           albums
        })
    }
    else{
        albums
    }
})

//delete photo.......

// Delete-plan
const deletePhoto = asyncHandler(async(req,res)=>{
    const plan = await albumModel.findById(req.params.id)
    if(plan){
      await plan.remove()
      res.status(200).json({id:req.params.id})
    }else{
       res.status(400)
       throw new Error("plan not found")
    }
  })


  //.....................

  const getUser=asyncHandler(async(req,res)=>{
    const { id } = req.query;
  
    const data = await User.findById(id)
    if(!data)throw new Error(`Couldn't find ${id}`);
    res.status(200).json({
      data,
    });
})



module.exports = {
    registerPhoto,
    loginPhoto,
    details,
    album,
    fetch,
    deletePhoto,
    editPhotographer,
    getUser
}