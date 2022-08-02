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

// Edituser
const editUser = async (token, userData) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await api.editUserDetails(userData, config);
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    console.log("im the return resopnse............",data);
    return data;
  };

//Logout user

const logout = () => {
    localStorage.removeItem('user')
}

// login-with-login
const googleLogin = async(userdata)=>{
  const {data} = await api.googleLogin(userdata)
  if (data) {
    localStorage.setItem('user', JSON.stringify(data))
  }
  return data
}


const authService = {
    register,
    logout,
    login,
    editUser,
    googleLogin
}

export default authService 
