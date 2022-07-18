
import *as api from '../../../api/Admin' 

const getUser = async () =>{
    const response = await api.userData()
    return response
}

const userService ={
    getUser
}

export default userService 