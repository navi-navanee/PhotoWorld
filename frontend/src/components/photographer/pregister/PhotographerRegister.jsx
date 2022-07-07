
import './pregister.scss'
import React from 'react'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { NavLink } from 'react-router-dom';


const photographerRegister = () => {
    const paperStyle ={padding:20, height:"60vh",width:280,margin:"-202px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
  return (
    <div className='main'>

    
    <Grid >
      <Paper elevation={10} style={paperStyle} >
        <Grid  style={{marginTop:"2rem"}} align='center'>
      <Avatar style={avatarStyle}><LockIcon/></Avatar>
      <h2  style={{marginTop:"1rem"}}>Register</h2>
        </Grid>
        <TextField id="standard-basic" label="UserName" variant="standard" placeholder='Enter Your Email' fullWidth />
        <TextField  style={{marginTop:"1rem"}} id="standard-basic" label="Email " variant="standard" placeholder='Enter Your Email' fullWidth />
        <TextField  style={{marginTop:"1rem"}} id="standard-basic" label="Password" variant="standard" placeholder='Password..' fullWidth />
        <TextField  style={{marginTop:"1rem"}} id="standard-basic" label="Password" variant="standard" placeholder='Re enter the password' fullWidth />
        <Button style={{marginTop:"2rem"}} type='submit' color='primary' variant='contained' fullWidth>Sign Up</Button>
        <Typography  style={{marginTop:"2rem"}}>Alredy have an account ?  <NavLink to={'/photographer'}>
                    Sign In
                  </NavLink></Typography>
      </Paper>
    </Grid>
  </div>
  )
}

export default photographerRegister