import './pregister.scss'
import React, { useState } from 'react'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';



const Photographerlogin = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData
  const navigate = useNavigate()

  const paperStyle = { padding: 20, height: "60vh", width: 280, margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }

  const onChange = (e) => {
    setFormData((prevState) => ({
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
    console.log("helooo", userData);
    navigate('/photographer/register2')
  }

  return (
    <div>

      <Grid >
        <Paper component="form" elevation={10} style={paperStyle} onSubmit={onSubmit} >
          <Grid style={{ marginTop: "2rem" }} align='center'>
            <Avatar style={avatarStyle}><LockIcon /></Avatar>
            <h2 style={{ marginTop: "1rem" }}>Sign Up</h2>
          </Grid >
          <TextField name='email' id="standard-basic" label="UserName" variant="standard" placeholder='Enter Your Email'
            onChange={onChange} fullWidth />
          <TextField name='password' style={{ marginTop: "1rem" }} id="standard-basic" label="Password" variant="standard" placeholder='Enter Your Email'
            onChange={onChange} fullWidth />
          <TextField name='password2' style={{ marginTop: "1rem" }} id="standard-basic" label="Password" variant="standard" placeholder='Enter Your Email'
            onChange={onChange} fullWidth />
          <Button style={{ marginTop: "2rem" }} type='submit' color='primary' variant='contained' fullWidth>Continue</Button>
          <Typography style={{ marginTop: "2rem" }}>Alredy hava account ?  <NavLink to={'/photographer'}>
            Sign In
          </NavLink></Typography>
        </Paper>
      </Grid>
    </div>
  )
}

export default Photographerlogin
