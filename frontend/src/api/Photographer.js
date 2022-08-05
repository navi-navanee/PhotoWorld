import axios from 'axios'
import { ALBUMS, DELETE_PHOTO, DETAILS, EDIT_PHOTOGRAPHER, FETCH, FETCH_REVIEW, LOGIN, REGISTER } from '../constant/PhotographerConstants'

const BACKEND_URL ='http://localhost:5000/api'

const API=axios.create({
    baseURL : `${BACKEND_URL}/photo`,
    withCredentials:true
})

export const register =(photographerData) => API.post(REGISTER,photographerData)
export const login =(photographerData) => API.post(LOGIN,photographerData)

export const editPhotographerDetails = (userData,config) => API.put(EDIT_PHOTOGRAPHER, userData,config);
export const fetchReview =(data,config) => API.get(`${FETCH_REVIEW}/${data}`,config)


export const details =(photographerData) => API.get(DETAILS,photographerData)
export const albums =(photographerData,config) => API.post(ALBUMS,photographerData,config)
export const fetch =(photographerData) => API.get(FETCH,photographerData)
 export const deletephotos=(id ,config)=>API.delete(`${DELETE_PHOTO}/${id}`,config)

 export const getUser = (id) => API.get(`/get-user?id=${id}`)
