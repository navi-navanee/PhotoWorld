import axios from "axios";

const API_URL = '/api/photo/'

//login Photographer

const login =async (photographerData) => {
    console.log("im service");
    const response =await axios.post(API_URL+'login',photographerData)
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
    logout

}


export default photographerauthService