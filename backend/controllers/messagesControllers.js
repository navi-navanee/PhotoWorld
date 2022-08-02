const asyncHandler = require('express-async-handler');
const Message = require("../models/Message");

// @desc  add message in to database
// @rout  POST /api/messages
const savedMessage=asyncHandler(async(req,res)=>{
    const newMessage = new Message(req.body);
      const saved_Message = await newMessage.save();
      res.status(200).json(saved_Message);
})

// @desc  get the all messages using conversation id
// @rout  POST /api/messages/:conversationId
const getMessage=asyncHandler(async(req,res)=>{
  console.log("im callelddddddddddd");
        const messages = await Message.find({
          conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
})



module.exports={
    savedMessage,
    getMessage
}