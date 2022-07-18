
import *as api from '../../../api/Admin'

//login user

const login =async (adminData) =>{
    const response =await api.login(adminData)
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