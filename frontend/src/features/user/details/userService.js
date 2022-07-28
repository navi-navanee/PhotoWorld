import *as api from '../../../api/User'

const filter =async (token)=>{
    const config = {
        headers : {
            Authorization : `Bearer ${token}`  
        }
     }
     const response = await api.filter(config)
     return response
}

const singleSearch = async (userData,token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`  
        }
    }
    const response = await api.singleSearch(userData,config)
    return response
}
const singleFetch = async (userData,token) => {
    console.log("im user data",userData);
    const config = {
        headers : {
            Authorization : `Bearer ${token}`  
        }
    }
    console.log("im the config",config);
    const response = await api.singleFetch(userData,config)
    console.log("im the single response",response);
    return response
}

const userService = {
    filter,
    singleSearch,
    singleFetch
}


export default userService