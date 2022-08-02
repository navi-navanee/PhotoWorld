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

app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))
app.use('/api/photo',require('./routes/photographerRoutes'))
app.use('/api/payment',require('./routes/paymentRoutes'))

app.use('/api/conversations', require('./routes/conversations'));
app.use('/api/messages', require('./routes/messages'));

app.use(errorHandler)

app.listen(port , ()=>{
   console.log(`server start on the port ${port}`);
})