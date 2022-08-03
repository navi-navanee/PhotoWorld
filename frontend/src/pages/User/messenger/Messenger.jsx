import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatOnline from '../../../components/users/chat/chatOnline/ChatOnline'
import Conversation from '../../../components/users/chat/conversations/Conversation'
import Message from '../../../components/users/chat/message/Message'
import * as api from '../../../api/messenger';
import Header from '../../../components/users/header/Header'
import './messenger.css'
import { useRef } from 'react'
import {io} from 'socket.io-client'


const Messenger = () => {

  const [conversation, setConversation] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const scrollRef =useRef()

  const socket =useRef()

  console.log("im current",currentChat);
console.log("im arrival",arrivalMessage);
  
  useEffect(() => {
    socket.current = io("ws://localhost:8900")
      socket.current.on("getMessage", data =>{
        setArrivalMessage({
          sender:data.senderId,
          text:data.text,
          createdAt:Date.now(),
        })
      })
   
  },[])

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages(prev =>[...prev,arrivalMessage])
  },[arrivalMessage , currentChat])


 useEffect(() => {
  socket.current.emit("adduser",user._id);
  socket.current.on("getUsers",users => {
    console.log("heloo mahbbb",users);
  })
 },[user])



  useEffect(() => {

    const getConversations = async () => {
      try {
        const { data } = await api.getConversation(user?._id)
        setConversation(data)
      } catch (error) {

      }
    }
    getConversations()
  }, [user._id])

 useEffect(() => {
  const getMessages =async() => {
    try {
      const res = await api.getMessage(currentChat?._id)
     
      setMessages(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  getMessages()
 },[currentChat])


 const handleSubmit = async (e) => {
  console.log("ysssssss");
  e.preventDefault();
  const message = {
    sender: user._id,
    text: newMessage,
    conversationId: currentChat._id,
  };

  const receiverId = currentChat.members.find(
    (member) => member !== user._id
  );


  socket.current.emit("sendMessage", {
    senderId: user._id,
    receiverId,
    text: newMessage,
  })



  try {
    console.log("im tryeee");
    const res = await api.savedMessage(message);
    setMessages([...messages , res.data])
    setNewMessage('')
  } catch (error) {
    console.log(error);
  }
}



useEffect(() => {
  scrollRef?.current?.scrollIntoView({behavior : "smooth"})
})

  return (
    <>
      <Header />
      <div className='messenger'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder='Search here' className="chatMenuInput" />
            {conversation.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>

        {/* Chat Box section ........................... */}
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat ?

                (<>
                  <div className="chatBoxTop">
                    {messages.map(m =>(  
                      <div ref={scrollRef}>
                        <Message message={m} own={m.sender === user._id}/>
                        </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea 
                    className='chatMessageInput' 
                    placeholder='write something........'
                    onChange={(e) =>setNewMessage(e.target.value)}
                    value={newMessage}
                    ></textarea>
                    <button className='chatSubmitButton'
                    onClick={handleSubmit}
                    >Send</button>
                  </div>
                </>
                ) : (
                  <span className="noConversationText">Open a conversation to start a chat.</span>
                )}
          </div>
        </div>
        {/* Chat online section ............................. */}
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger