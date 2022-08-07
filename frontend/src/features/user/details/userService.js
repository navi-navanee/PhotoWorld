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
    const config = {
        headers : {
            Authorization : `Bearer ${token}`  
        }
    }
    const response = await api.singleFetch(userData,config)
    return response
}
//.............................

const addReview =async (data,token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response =await api.addReview(data,config) 
    return response
}
//................................
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

//...................................................

const wedding =async ()=>{
    // console.log("im the token",token);
    // const config = {
    //     headers : {
    //         Authorization : `Bearer ${token}`  
    //     }
    //  }
    //  console.log("im the config",config);
     const response = await api.wedding()
     console.log("im the response.....",response);
     return response
}

//.....................................................


const nature =async ()=>{
     const response = await api.nature()
     console.log("im the response.....",response);
     return response
}

//..............Like........................

const like =async (data,token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response =await api.like(data,config) 
    console.log("myree likeee",response);
    return response
}

//...................Unkile...................

// const unlike =async (data,token) => {
//     const config = {
//         headers : {
//             Authorization : `Bearer ${token}`
//         }
//     }
//     const response =await api.unlike(data,config) 
//     return response
// }


const userService = {

    filter,
    singleSearch,
    singleFetch,
    wedding,
    nature,
    addReview,
    fetchReview,
    like,
    // unlike
}


export default userService