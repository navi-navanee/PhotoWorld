import axios from 'axios'

const API_URL = '/api/admin/'

//login user

const login =async (adminData) =>{
    console.log("imhereeee");
    const response =await axios.post(API_URL+'login',adminData)
    console.log("imcallledd........");
    if(response.data){
        localStorage.setItem('admin',JSON.stringify(response.data))
    }
    return response.data
}

//logout admin
const logout = async() => {
 
 await localStorage.removeItem('admin')
}


const adminauthService = {
    login,
    logout
}

export default adminauthService