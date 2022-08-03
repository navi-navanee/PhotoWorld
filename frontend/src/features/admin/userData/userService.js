
import *as api from '../../../api/Admin' 

//get user
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

//.............

//get photographer
const getPhotographer = async () =>{
    const response = await api.photographerData()
    return response
}

//block users

export const BlockPhotographer = async (userData,token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`  
        }
    }
    console.log("im internal callllllllll",userData)
  const { data } = await api.blockPhotographer(userData,config)
  return data;
};



const userService ={
    getUser,
    BlockUsers,
    getPhotographer,
    BlockPhotographer


}

export default userService 