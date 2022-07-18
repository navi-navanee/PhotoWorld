
import *as api from '../../../api/User'



//Register user
const register = async (userData) =>{
    const response =await api.registerUser(userData)
    if(response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//login user
const login = async (userData) =>{
    console.log("im calledd");
    const response =await api.loginUser(userData)
    if(response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}

//Logout user

const logout = () => {
    localStorage.removeItem('user')
}


const authService = {
    register,
    logout,
    login
}

export default authService 
