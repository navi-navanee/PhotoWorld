import axios from "axios";

const API_URL = '/api/admin/getUser'

const getUser = async () =>{
    const response = await axios.get(API_URL)
    return response
}

const userService ={
    getUser
}

export default userService 