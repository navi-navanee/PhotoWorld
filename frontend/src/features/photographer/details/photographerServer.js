
import *as api from '../../../api/Photographer'


const details =async (token) => {
 const config = {
    headers : {
        Authorization : `Bearer ${token}`  
    }
 }
 const response = await api.details(config)

 if (response.data) {
 }
 return response.data
}


const albums =async (data,token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response =await api.albums(data,config) 
}


const fetch=async (token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`  
        }
     }
    console.log("im configgg",config);
    const response = await api.fetch(config)
    console.log("im response", response);

    if (response.data) {
        console.log("im response", response.data);
    }
    return response.data
   
   
}



const photographerService = {
    details,
    albums,
    fetch,
}

export default photographerService