import axios from 'axios'

import { USER_REGISTER , USER_LOGIN, USER_FILTER} from '../constant/UserConstants'

const BACKEND_URL = 'http://localhost:5000/api'

const API=axios.create ({
    baseURL : `${BACKEND_URL}/user`,
    withCredentials:true,
})

export const registerUser=(userData) => API.post(USER_REGISTER,userData)
export const loginUser=(userData) => API.post(USER_LOGIN,userData)
export const filter=(userData) => API.get(USER_FILTER,userData)

