import *as api from '../../../api/User'

const filter =async (token)=>{
    console.log("im the service.....");
    const config = {
        headers : {
            Authorization : `Bearer ${token}`  
        }
     }

     const response = await api.filter(config)
     console.log("im the response.....");
     return response
}

const userService = {
    filter
}


export default userService