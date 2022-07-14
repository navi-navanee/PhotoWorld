import axios from 'axios'


const API_URL = '/api/photo/'

const details = async (id) => {
    const data = {
        id
    }

    const response = await axios.post(API_URL + 'details', data)
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