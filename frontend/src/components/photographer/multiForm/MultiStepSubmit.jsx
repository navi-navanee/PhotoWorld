
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../../../features/photographer/auth/photographerauthSlice";
import Spinner from "../../spinner/Spinner";


const Submit = (props) => {
  const { data } = props;

  console.log("final page data",data);

  const navigate=useNavigate()
  const dispatch=useDispatch()
 
  const { photographer, isLoading, isError, isSuccess, message } = useSelector(
   (state) => state.photographerauth)
 
   const {password, password2 } = data

   console.log("im the photographer",photographer);
 
   useEffect(() => {
     if(isError){
       toast.error(message)
     }
     if(isSuccess && photographer){
       navigate('/photographer/home')
     }
   },[photographer, isError, isSuccess, message, navigate, dispatch])
 

   
  const onSubmit = (e) => {
    e.preventDefault()

    console.log("im clickeddddddd");

    if (password !== password2) {
      toast.error('Password do not match')
    } else {
      console.log("lastdata",data);
      dispatch(register(data))
    }
  }

 
   if (isLoading) {
     return <Spinner/>
   }
 
  
  return (
    <div style={{display:"flex",justifyContent:"center" ,}}>
  
      <button onClick={onSubmit} type="submit">Submit</button>
    </div>
  );
};
export default Submit;