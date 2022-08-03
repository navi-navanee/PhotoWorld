import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000/api'

const API = axios.create({
  baseURL:`${BACKEND_URL}/`,
  withCredentials: true,
});

//Chat Endpoints
export const savedMessage = (data) => API.post(`/messages`,data);
export const getMessage = (id) => API.get(`/messages/${id}`);

export const newConversation = (data) => API.post(`/conversations`,data);
export const getConversation = (id) => API.get(`/conversations/${id}`);