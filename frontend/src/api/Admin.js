import axios from 'axios'
import { BLOCK_PHOTOGRAPHER, BLOCK_USER, LOGIN, PHOTOGRAPHER, TOTALPHOTOGRAPHERS, TOTALUSERS, TRANSACTION, USER } from '../constant/AdminConstants'

const BACKEND_URL = 'http://localhost:5000/api'

const API = axios.create ({
    baseURL : `${BACKEND_URL}/admin`,
    withCredentials:true,
})

export const login =(adminData) => API.post(LOGIN,adminData)

export const  userData=() => API.get(USER)
export const  blockUser=(userData,config) => API.patch(`${BLOCK_USER}${userData}`,config)
//............
export const  photographerData=() => API.get(PHOTOGRAPHER)
export const  blockPhotographer=(userData,config) => API.patch(`${BLOCK_PHOTOGRAPHER}${userData}`,config)
//...........
export const  latestTransactions=(config) =>API.get(TRANSACTION)
export const  totalUsers=() =>API.get(TOTALUSERS)
export const  totalPhotographer=() =>API.get(TOTALPHOTOGRAPHERS)

