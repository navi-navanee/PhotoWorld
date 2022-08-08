import { useEffect, useState } from 'react'
import './conversation.css'
import * as api from '../../../../api/User';

const Conversation = ({ conversation, currentUser }) => {
    
    const [user, setUser] = useState(null)
    useEffect(() => {
        const photographerId = conversation.members.find((m) => m !== currentUser._id);

        const getPhotographer = async () => {
            try {
                const {data}  = await api.getPhotographer(photographerId)
   
                setUser(data?.data)
            } catch (error) {
                console.log(error);
            }
        }
        getPhotographer()
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

export default Conversation