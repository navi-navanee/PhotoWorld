const asyncHandler = require('express-async-handler');
const Conversation = require('../models/Conversation');

// @desc  start new conversation
// @rout  POST /api/conversations/
const newConversation = asyncHandler(async (req, res) => {
  console.log("ddd",req.body.senderId);
  const data= await Conversation.find({
    $and: [
{'members.0':req.body.senderId},
{'members.1':req.body.receiverId}
    ]
  })
  if(data.length===0){
    console.log("creates");
    const new_Conversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    const savedConversation = await new_Conversation.save();
    res.status(200).json(savedConversation);
  } 
  res.json("null");

});

// @desc  get conversation of a user
// @rout  POST /api/conversations/:userId 
const getConversation = asyncHandler(async (req, res) => {
  console.log("heloooo getConversation",);
  const conversation = await Conversation.find({
    members: { $in: [req.params.userId] },
  });
  res.status(200).json(conversation);
});

module.exports = {
  newConversation,
  getConversation,
};