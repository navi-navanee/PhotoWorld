import './plogin.scss'
import React from 'react'
import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import { NavLink } from 'react-router-dom';


const Photographerlogin = () => {
  const paperStyle ={padding:20, height:"60vh",width:280,margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle} >
        <Grid  style={{marginTop:"2rem"}} align='center'>
      <Avatar style={avatarStyle}><LockIcon/></Avatar>
      <h2  style={{marginTop:"1rem"}}>Sign In</h2>
        </Grid>
        <TextField id="standard-basic" label="UserName" variant="standard" placeholder='Enter Your Email' fullWidth />
        <TextField  style={{marginTop:"1rem"}} id="standard-basic" label="Password" variant="standard" placeholder='Enter Your Email' fullWidth />
        <Button style={{marginTop:"2rem"}} type='submit' color='primary' variant='contained' fullWidth>Sign In</Button>
        <Typography  style={{marginTop:"2rem"}}>Create an account ?  <NavLink to={'register'}>
                    Sign Up
                  </NavLink></Typography>
      </Paper>
    </Grid>
  )
}

export default Photographerlogin