import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../User/messenger/messenger.css'
import Message from '../../../components/users/chat/message/Message'
import * as api from '../.././../api/messenger';
import Pheader from '../../../components/photographer/header/Pheader'
import ChatOnline from '../../../components/photographer/chat/ChatOnline';
import Conversation from '../../../components/photographer/chat/Conversation';
import {io} from 'socket.io-client'
import { Button } from '@mui/material';

const Messenger = () => {

    const [conversation, setConversation] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const { photographer } = useSelector((state) => state.photographerauth)
    const scrollRef =useRef()
    const socket =useRef()
    //....................
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
      arrivalMessage && 
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages(prev =>[...prev,arrivalMessage])
    },[arrivalMessage , currentChat])
  
  
   useEffect(() => {
    socket.current.emit("adduser",photographer._id);
    socket.current.on("getUsers",users => {
      console.log("heloo mahbbb",users);
    })
   },[photographer])

  //.........................

    useEffect(() => {
        const getConversations = async () => {
          try {
            const { data } = await api.getConversation(photographer?._id)
            console.log("myrrrrrrrr",data);
            setConversation(data)
          } catch (error) {
    
          }
        }
        getConversations()
      }, [photographer._id])


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

  //..........................................................     
       const handleSubmit = async (e) => {
        e.preventDefault();

        const message = {
          sender: photographer._id,
          text: newMessage,
          conversationId: currentChat._id,
        }
        
        const receiverId =await currentChat.members.find(
          (member) => member !== photographer._id
        );

        socket.current.emit("sendMessage", {
          senderId: photographer._id,
          receiverId,
          text: newMessage,
        })

        try {
          const res = await api.savedMessage(message);
          setMessages([...messages,res.data])
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
        <Pheader/>
        <div className='messenger'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder='Search here' className="chatMenuInput" />
            {conversation.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={photographer} />
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
                        <Message message={m} own={m.sender === photographer._id}/>
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