
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
    return response
}


const fetch=async (token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`  
        }
     }
    const response = await api.fetch(config)
    if (response.data) {
    }
    return response.data
}


//deleting the photo

const deletephotos=async(id ,token)=>{
    const config = {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
    const {data} = await api.deletephotos(id ,config)
    console.log("delete data response......",data);
    return data
  }


  //........................

  const fetchReview =async (data,token) => {

    console.log("im the fetchreview service",data);
    const config = {
        headers : {
            Authorization : `Bearer ${token}`  
        }
     }
    const response = await api.fetchReview(data,config)
    if (response.data) {
      
        return response.data
    }
}




const photographerService = {
    details,
    albums,
    fetch,
    deletephotos,
    fetchReview
}

export default photographerService