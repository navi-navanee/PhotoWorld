import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatOnline from '../../../components/users/chat/chatOnline/ChatOnline'
import Conversation from '../../../components/users/chat/conversations/Conversation'
import Message from '../../../components/users/chat/message/Message'
import * as api from '../../../api/messenger';
import * as API from '../../../api/User';
import Header from '../../../components/users/header/Header'
import './messenger.css'
import { useRef } from 'react'
import {io} from 'socket.io-client'
import { Button } from '@mui/material'


const Messenger = () => {

  const [conversation, setConversation] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState(null)
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const scrollRef =useRef()

  const socket =useRef()


  
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
 const [pdata,setpData]=useState("")

// //////////

useEffect(()=>{
  findUser(currentChat) 
},[currentChat])

////////////////

const findUser=async(p)=>{
  const receiverId = p?.members?.find(
    (member) => member !== user._id
  );
  const {data}  =await API.getPhotographer(receiverId)
  setpData(data?.data)
}

 const handleSubmit = async (e) => {

  e.preventDefault();
  const message = {
    sender: user._id,
    text: newMessage,
    conversationId: currentChat._id,
  };

  const receiverId = currentChat.members.find(
    (member) => member !== user._id
  );

  
  try {

    if(newMessage!==null && newMessage!=="" )
    {

      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: newMessage,
      })
      const res = await api.savedMessage(message);
      setMessages([...messages , res.data])
      setNewMessage('')
    }
  } catch (error) {
    console.log(error);
  }
}



useEffect(() => {
  scrollRef?.current?.scrollIntoView({behavior : "smooth"})
})
console.log("name",pdata);
  return (
    <>
      <Header />
      <div className='messenger'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <div>

            <input  placeholder='Search here' className="chatMenuInput" />
            </div>
            {conversation.map((c) => (
              <div onClick={() =>{
                 setCurrentChat(c)
                
                 }}>
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
                <div className='chatName'>
                  <img src={pdata?.image} style={{width:"3rem" ,height:"3rem", borderRadius:"50%"}} alt="" />
                  <h2 style={{color:"white"}}>{pdata?.name}</h2>
                </div>
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
                    placeholder='write something......'
                    onChange={(e) =>setNewMessage(e.target.value)}
                    value={newMessage}
                    ></textarea>
                    <Button style={{marginRight:"1rem"}} className='chatSubmitButton'  variant="outlined" 
                    onClick={handleSubmit}
                    >Send</Button>
                  </div>
                </>
                ) : (
                  <span className="noConversationText">Open a conversation to start a chat.</span>
                )}
          </div>
        </div>
        {/* Chat online section ............................. */}
        {/* <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div> */}
      </div>
    </>
  )
}

export default Messenger