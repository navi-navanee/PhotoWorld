const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler} =require('./middleware/errorMiddleware')
const connectDB =require('./config/db')
const port=process.env.PORT || 5000
const cors =require("cors")

connectDB()

const app= express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({origin:true,credentials:true}))

//User route
app.use('/api/user', require('./routes/userRoutes'))
//admin route
app.use('/api/admin', require('./routes/adminRoutes'))
//photographer route
app.use('/api/photo',require('./routes/photographerRoutes'))
//payment route
app.use('/api/payment',require('./routes/paymentRoutes'))
//conversation route
app.use('/api/conversations', require('./routes/conversations'));
//message route
app.use('/api/messages', require('./routes/messages'));

app.use(errorHandler)

app.listen(port , ()=>{
   console.log(`server start on the port ${port}`);
})