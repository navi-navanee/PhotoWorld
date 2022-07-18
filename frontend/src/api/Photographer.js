import axios from 'axios'
import { DETAILS, LOGIN, REGISTER } from '../constant/PhotographerConstants'

const BACKEND_URL ='http://localhost:5000/api'

const API=axios.create({
    baseURL : `${BACKEND_URL}/photo`,
    withCredentials:true
})

export const register =(photographerData) => API.post(REGISTER,photographerData)
export const login =(photographerData) => API.post(LOGIN,photographerData)
export const details =(photographerData) => API.get(DETAILS,photographerData)