import React from 'react'
import ChatOnline from '../../components/users/chat/chatOnline/ChatOnline'
import Conversation from '../../components/users/chat/conversations/Conversation'
import Message from '../../components/users/chat/message/Message'

import Header from '../../components/users/header/Header'
import './messenger.css'

const Messenger = () => {
  return (
    <>
      <Header />
      <div className='messenger'>
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder='Search here' className="chatMenuInput" />
            <Conversation/>
            <Conversation/>
            <Conversation/>
            <Conversation/>
          </div>
        </div>

 {/* Chat Box section ........................... */}
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message/>
              <Message own={true}/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
              <Message/>
            </div>
            <div className="chatBoxBottom">
              <textarea className='chatMessageInput' placeholder='write something........'></textarea>
              <button className='chatSubmitButton'>Send</button>
            </div>
          </div>
        </div>
{/* Chat online section ............................. */}
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger