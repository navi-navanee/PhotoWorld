import { Avatar, Button, Grid, Paper, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import LockIcon from '@mui/icons-material/Lock';
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { form1 } from '../../../features/photographer/auth/photographerauthSlice'
import { Box } from '@mui/system';




const steps = [
    'Basic Information',
    'Contact Details',
    'Payment',
];

const Signup1 = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" });
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const onSubmit = (e) => {
        console.log("helooooo");
        const { name, email, password, password2 } = e;
        if(password !== password2){
            toast.error('Password doesnot match')
        }
        else {
            const userData = {
                name,
                email,
                password,
            };
            console.log("im userData", userData);
            dispatch(form1(userData));
            navigate('/photographer/signup2');
        }
    }

    const paperStyle = { padding: 20, height: "85vh", width: 400, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }

    return (
        <div>
         <Box sx={{ width: '100%' }}>
        <Stepper style={{marginTop:"2rem"}} activeStep={0} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
            <div className="col-1">
                <Grid >
                    <Paper component="form" elevation={10} style={paperStyle}  >
                        <Grid style={{ marginTop: "2rem" }} align='center'>
                            <Avatar style={avatarStyle}><LockIcon /></Avatar>
                            <h2 style={{ marginTop: "1rem" }}>Sign Up</h2>
                        </Grid >
                        <TextField
                            name="name"
                            label="Name"
                            placeholder="Enter your Name"
                            fullWidth
                            {...register("name", { required: true })}
                        />
                        {errors.name && <p style={{ color: 'red' }}>Please add the field</p>}

                        <TextField
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            fullWidth
                            {...register("email", { required: true, pattern: pattern })}
                        />
                        {errors.email && <p style={{ color: 'red' }}>Please check the Email</p>}

                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            fullWidth
                            {...register("password", {
                                required: true,
                                minLength: 6
                            })}

                        />
                        {errors.password && <p style={{ color: 'red' }}>Please check the Password</p>}

                        <TextField
                            label="Password"
                            type="password"
                            name="password2"
                            placeholder="Enter password"
                            fullWidth
                            {...register("password2", {
                                required: true,
                                minLength: 6
                            })}

                        />
                        {errors.password2 && <p style={{ color: 'red' }}>Please check the Password</p>}
                        <Typography style={{ marginTop: "2rem" }}>Alredy hava account ?  <NavLink to={'/photographer'}>
                            Sign In
                        </NavLink></Typography>
                        <Button style={{marginTop:".5rem"}}  onClick={handleSubmit(onSubmit)} variant='contained' size='large' fullWidth >Next</Button>
                    </Paper>
                </Grid>

            </div>
            <div className="col-2"></div>
        </div>
    )
}

export default Signup1