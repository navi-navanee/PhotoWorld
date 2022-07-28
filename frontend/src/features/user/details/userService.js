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
    console.log("single search..");

    console.log("im the id",userData);
    console.log("im the token",token);

    const config = {
        headers : {
            Authorization : `Bearer ${token}`  
        }
    }
    console.log("im config",config);
    const response = await api.singleSearch(userData,config)
    console.log("im the sigle response",response);
    return response
}

const userService = {
    filter,
    singleSearch
}


export default userService