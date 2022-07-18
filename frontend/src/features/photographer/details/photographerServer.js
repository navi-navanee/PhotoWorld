import axios from 'axios'

import *as api from '../../../api/Photographer'


const details = async (id) => {
    const data = {
        id
    }

    const response = await api.details(data)
    console.log("im response", response);
    if (response.data) {
        console.log("im response", response.data);
    }
    return response.data
}

const photographerService = {
    details
}

export default photographerService