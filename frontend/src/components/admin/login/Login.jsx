import React, { useEffect, useState } from 'react'
import './login.scss'
import { useForm } from "react-hook-form";
import bgImg from '../../../images/img1.jpg'
import { useSelector,useDispatch } from 'react-redux';
import { login } from '../../../features/admin/auth/adminauthSlice';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const Login = () => {

    const dispatch = useDispatch()
    const navigate=useNavigate()

    const {admin , isLoading , isError , isSuccess , message} = useSelector((state) => state.adminauth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
            return
        }
        if(isSuccess || admin){
            navigate('/admin/home')
        }
    },[admin,isError,isSuccess,message,navigate,dispatch])


    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    
    const onSubmit = (e)=>{
        dispatch(login(e))
        }

    

  return (
    <section className='common' >
        <div className="register">
            <div className="col-1">
                <h2>Sign In</h2>
                <span>Please enter the details</span>

                <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" {...register("email")} placeholder='username' />
                    <input type="text" {...register("password")} placeholder='password' />
                    <button className='btn'>Sign In</button>
                </form>

            </div>
            <div className="col-2">
                <img src={bgImg} alt="" />
            </div>
        </div>
    </section>
  )
}

export default Login