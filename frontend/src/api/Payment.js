import axios from 'axios'

const BACKEND_URL = 'http://localhost:5000/api'

const  API=axios.create ({
    baseURL : `${BACKEND_URL}/payment`,
    withCredentials:true,
})

export const getRazorkey = () => API.get(`/get-rozerpay-key`);
export const createOrder = (data) => API.post(`/create-order`,data);
export const verifyAndPay = (data) => API.post(`/pay-order`,data);


