
import *as api from '../../../api/Admin' 

const getUser = async () =>{
    const response = await api.userData()
    return response
}

//block users

export const BlockUsers = async (userData,token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`  
        }
    }
    console.log("im internal callllllllll",userData)
  const { data } = await api.blockUser(userData,config)
  return data;
};



const userService ={
    getUser,
    BlockUsers
}

export default userService 