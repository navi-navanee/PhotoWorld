export const errorHandler = (error)=>{
    if(error){
    const message =(error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString() ||
        'Something wrong. Please check your network';
        return message;
    }else{
        return null;
    }
}