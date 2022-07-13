import './plogin.scss'
import React, { useState,useEffect } from 'react'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { login ,reset } from '../../../features/photographer/auth/photographerauthSlice';
import { useSelector,useDispatch } from 'react-redux';
import Spinner from '../../spinner/Spinner';


const Photographerlogin = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {email , password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {photographer , isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.photographerauth
  )


  useEffect(() => {
 
    if(isError) {
      toast.error(message)
    }
    if(isSuccess && photographer) {
      navigate('/photographer/home')
    }

  },[photographer, isError, isSuccess, message, navigate, dispatch])

 

  const paperStyle = { padding: 20, height: "60vh", width: 280, margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value,
      
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email,
      password
    }
    console.log("helooo",userData);
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner/>
  }

  return (
    <div>

      <Grid >
        <Paper component="form" elevation={10} style={paperStyle} onSubmit={onSubmit} >
          <Grid style={{ marginTop: "2rem" }} align='center'>
            <Avatar style={avatarStyle}><LockIcon /></Avatar>
            <h2 style={{ marginTop: "1rem" }}>Sign In</h2>
          </Grid >
          <TextField name='email' id="standard-basic" label="UserName" variant="standard" placeholder='Enter Your Email'
          onChange={onChange} fullWidth />
          <TextField name='password' type={'password'} style={{ marginTop: "1rem" }} id="standard-basic" label="Password" variant="standard" placeholder='Enter Your Email' 
          onChange={onChange} fullWidth />
          <Button style={{ marginTop: "2rem" }} type='submit' color='primary' variant='contained' fullWidth>Sign In</Button>
          <Typography style={{ marginTop: "2rem" }}>Create an account ?  <NavLink to={'register'}>
            Sign Up
          </NavLink></Typography>
        </Paper>
      </Grid>
    </div>
  )
}

export default Photographerlogin
