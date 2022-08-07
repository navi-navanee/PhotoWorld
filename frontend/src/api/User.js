import axios from 'axios'

import { USER_REGISTER , USER_LOGIN, USER_FILTER, SINGLE_SEARCH, 
    SINGLE_FETCH, WEDDING, EDIT_USER, USER_GOOGLE_LOGIN,
     NATURE, ADD_REVIEW, FETCH_REVIEW, LIKE_PHOTO, UNLIKE_PHOTO} from '../constant/UserConstants'

const BACKEND_URL = 'http://localhost:5000/api'

const API=axios.create ({
    baseURL : `${BACKEND_URL}/user`,
    withCredentials:true,
})

export const registerUser=(userData) => API.post(USER_REGISTER,userData)
export const loginUser=(userData) => API.post(USER_LOGIN,userData)
export const googleLogin=(userData) => API.post(USER_GOOGLE_LOGIN,userData)

export const addReview =(data,config) => API.post(ADD_REVIEW,data,config)
export const fetchReview =(data,config) => API.get(`${FETCH_REVIEW}/${data}`,config)
export const like = (userData,config) => API.put(LIKE_PHOTO, userData,config);
export const unlike = (userData,config) => API.put(UNLIKE_PHOTO, userData,config);



export const editUserDetails = (userData,config) => API.put(EDIT_USER, userData,config);
export const filter=(userData) => API.get(USER_FILTER,userData)
export const singleSearch=(userData,config) => API.get( `${SINGLE_SEARCH}/${userData}`,config)
export const singleFetch=(userData,config) => API.get( `${SINGLE_FETCH}/${userData}`,config)

export const wedding=() => API.get(WEDDING)
export const nature=() => API.get(NATURE)
//chat........
export const getPhotographer = (id) => API.get(`/get-photographer?id=${id}`)

