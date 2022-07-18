import axios from 'axios'
import { LOGIN, USER } from '../constant/AdminConstants'

const BACKEND_URL = 'http://localhost:5000/api'

const API = axios.create ({
    baseURL : `${BACKEND_URL}/admin`,
    withCredentials:true,
})

export const login =(adminData) => API.post(LOGIN,adminData)
export const  userData=() => API.get(USER)

