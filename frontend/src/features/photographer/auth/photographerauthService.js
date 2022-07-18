import axios from "axios";

import *as api from '../../../api/Photographer'

//register photographer

const register = async (photographerData) => {
    console.log("im sending data");
    const response =await api.register(photographerData)
    if(response.data){

        localStorage.setItem('photographer',JSON.stringify(response.data))
    }
    return response.data
}



//login Photographer

const login =async (photographerData) => {
    console.log("im service");
    const response =await api.login(photographerData)
    console.log("im responsee",response);
    if(response.data){
        localStorage.setItem('photographer',JSON.stringify(response.data))
    }
    return response.data
}

//logout
const logout =async() => {
    console.log("heloo");
    await localStorage.removeItem('photographer')
}

const photographerauthService ={
    login,
    logout,
    register,

}


export default photographerauthService