import axios from 'axios'

import { USER_REGISTER , USER_LOGIN} from '../constant/UserConstants'

const BACKEND_URL = 'http://localhost:5000/api'

const API=axios.create ({
    baseURL : `${BACKEND_URL}/user`,
    withCredentials:true,
})

export const registerUser=(userData) => API.post(USER_REGISTER,userData)
export const loginUser=(userData) => API.post(USER_LOGIN,userData)

