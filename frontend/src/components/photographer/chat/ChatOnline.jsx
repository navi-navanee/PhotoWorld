import React, { useEffect, useState } from 'react'
import '../../users/chat/chatOnline/chatOnline.css'

import * as api from '../../../api/Photographer';

const ChatOnline = ({ conversation, currentUser }) => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const userId = conversation.members.find((m) => m !== currentUser._id);

        const getUser = async () => {
            try {
                const {data}  = await api.getUser(userId)
   
                setUser(data?.data)
            } catch (error) {
                console.log(error);
            }
        }
        getUser()
    },[currentUser,conversation])


  return (

   <div className='conversation'>
            <img
                className="conversationImg"
                src={user ?user.image : 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='}
                alt="profile_picture"
            />
            <span className="conversationName">{user?.name}</span>
        </div>
  )
}

export default ChatOnline