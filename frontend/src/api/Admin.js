import axios from 'axios'
import { BLOCK_PHOTOGRAPHER, BLOCK_USER, LOGIN, PAYMENT, PHOTOGRAPHER,
     TOTALPHOTOGRAPHERS, TOTALUSERS, TOTAL_INCOME, 
     TRANSACTION, USER } from '../constant/AdminConstants'

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

//Payment
export const fetchPayment=() => API.get(PAYMENT)

export const  latestTransactions=(config) =>API.get(TRANSACTION)
export const  totalUsers=() =>API.get(TOTALUSERS)
export const  totalPhotographer=() =>API.get(TOTALPHOTOGRAPHERS)
export const  totalIncome=() =>API.get(TOTAL_INCOME)

