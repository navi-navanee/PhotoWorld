import React, { useEffect, useState } from 'react'
import './login.scss'
import { useForm } from "react-hook-form";
import bgImg from '../../../images/img1.jpg'
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../../features/admin/auth/adminauthSlice';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { admin, isLoading, isError, isSuccess, message } = useSelector((state) => state.adminauth)

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" });
    const [formData, setformData] = useState({
        email: "",
        password: "",
    });
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    useEffect(() => {
        if (isError) {
            toast.error(message)
            return
        }
        if (isSuccess || admin) {
            navigate('/admin/home')
        }
    }, [admin, isError, isSuccess, message, navigate, dispatch])

    const onSubmit = (e) => {
        const { email, password } = e;
        if (email && password) {
            const userData = {
                email,
                password,
            };
            dispatch(login(userData));
        } else {
            toast.error('Please fill the Details..')
        }
    }



    return (
        <section className='common' >
            <div className="register">
                <div className="col-1">
                    <h2>Sign In</h2>
                    <span>Please enter the details</span>

                    <form id='form' className='flex flex-col' >
                        <input
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            fullWidth
                            {...register("email", { required: true, pattern: pattern })}
                        />
                        {errors.email && <p style={{ color: 'red' }}>Please check the Email</p>}
                        <input
                            label="Password"
                            name="password"
                            placeholder="Enter password"
                            fullWidth
                            {...register("password", {
                                required: true,
                                minLength: 6
                            })} 
                            />
                        {errors.password && <p style={{ color: 'red' }}>Please check the Password</p>}

                        <Button onClick={handleSubmit(onSubmit)} variant='contained' size='large' >Sign In</Button>
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