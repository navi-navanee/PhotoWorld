import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import LockIcon from '@mui/icons-material/Lock';
import { NavLink } from "react-router-dom";

const Step1 = (props) => {
  const { data, handleChange, next } = props;

  const paperStyle = { padding: 20, height: "60vh", width: 280, margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }

  return (
    <form>
    <Grid >
        <Paper component="form" elevation={10} style={paperStyle}  >
          <Grid style={{ marginTop: "2rem" }} align='center'>
            <Avatar style={avatarStyle}><LockIcon /></Avatar>
            <h2 style={{ marginTop: "1rem" }}>Sign Up</h2>
          </Grid >
          <TextField name='name' id="standard-basic" label="UserName" variant="standard" placeholder='Enter Your Name'
             value={data.name}
             onChange={handleChange} fullWidth />
          <TextField name='email' style={{ marginTop: "1rem" }} id="standard-basic" label="Email" variant="standard" placeholder='Enter Your Email'
             value={data.email}
             onChange={handleChange} fullWidth />
          <TextField name='password' type={"password"} style={{ marginTop: "1rem" }} id="standard-basic" label="Password" variant="standard" placeholder='Password'
             value={data.password}
             onChange={handleChange} fullWidth />
          <TextField name='password2' type={"password"}  style={{ marginTop: "1rem" }} id="standard-basic" label="Password" variant="standard" placeholder='reenterPassword'
             value={data.password2}
             onChange={handleChange} fullWidth />
          <Button style={{ marginTop: "2rem" }} type='submit' color='primary' variant='contained' onClick={next} fullWidth>Continue</Button>
          <Typography style={{ marginTop: "2rem" }}>Alredy hava account ?  <NavLink to={'/photographer'}>
            Sign In
          </NavLink></Typography>
        </Paper>
      </Grid>
    </form>
  );
};
export default Step1;