// import { useState, useEffect } from 'react'
// import React from 'react'
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';

// import Link from '@mui/material/Link';
// import {NavLink , useNavigate} from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { login,reset } from '../../../features/user/auth/authSlice';

// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useSelector,useDispatch } from 'react-redux';

// import Header from '../../../components/users/header/Header';
// import './login.scss'
// import Spinner from '../../../components/spinner/Spinner';


// function Login() {
//   const [formData, setFormData] = useState({
 
//     email: '',
//     password: '',

//   })

//   const { email, password} = formData

//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth)

//     console.log("im the error message",message);

//     useEffect(() => {
//       if (isError) {
//         toast.error(message)
//       }
  
//       if (isSuccess || user) {
//         navigate('/')
//       }
//       dispatch(reset())

//     }, [user, isError, isSuccess, message, navigate, dispatch])
  


  
//   const onChange = (e) => {
//     setFormData((prevState)=>({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }))
//   }
  
//   const onSubmit = (e) => {
//     e.preventDefault()
//     const userData = {
//       email,
//       password
//     }
//     console.log("user",userData);
//     dispatch(login(userData))
//   }

//   if (isLoading) {
//     return <Spinner/>
//   }

//   const theme = createTheme();
//   return (
//     <div>

 
//     <ThemeProvider theme={theme}>
//       <Grid container component="main" sx={{ height: '100vh' }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage: 'url(https://source.unsplash.com/random)',
//             backgroundRepeat: 'no-repeat',
//             backgroundColor: (t) =>
//               t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <LockOutlinedIcon />
              
//             </Avatar>
//             <Typography  component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <Box component="form" noValidate  sx={{ mt: 1 }} onSubmit={onSubmit}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//                 value={email}
//                 onChange={onChange}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 value={password}
//                 onChange={onChange}
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 SignIn
//               </Button>
//               <Grid container>
//                 <Grid item xs>
//                   <NavLink to={'/photographer'}>
//                  PHOTOGRAPHER Click here
//                   </NavLink>
//                 </Grid>
//                 <Grid item>
//                   <NavLink to={'/register'}>
//                     {"Don't have an account? Sign Up"}
//                   </NavLink>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//     </div>
//   )
// }

// export default Login



import { useState, useEffect } from 'react'
import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';

import Link from '@mui/material/Link';
import {NavLink , useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import { googleLogin, login,reset } from '../../../features/user/auth/authSlice';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';

import Header from '../../../components/users/header/Header';
import './login.scss'
import Spinner from '../../../components/spinner/Spinner';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

import { useForm } from "react-hook-form";



function Login() {

  console.log("im the env",process.env.REACT_APP_GOOGLE_CLIENT_ID);
 
  const [formData, setFormData] = useState({
    email: '',
    password: '',

  })

  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  const { email, password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth)

    console.log("im the error message",message);


    const onLoginSuccess = (response) => {
      console.log("im in hereeee");
      const start = () => {
        gapi.client.init({
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: '',
        })
        gapi.load('client:auth2', start)
      }
      dispatch(googleLogin(response.profileObj))
      console.log('happy hello', response.profileObj)
    }

    const onLoginFailure = (response) => {
      toast.error(response.message)
    }

    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
  
      if (isSuccess || user) {
        navigate('/')
      }
      dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

  
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


const { register, handleSubmit, formState: { errors } } = useForm({ mode: "all" });

  


  if (isLoading) {
    return <Spinner/>
  }

  const theme = createTheme();
  return (
    <div>

 
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
              
            </Avatar>
            <Typography  component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate  sx={{ mt: 1 }} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                margin="normal"
                required
                id="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
                fullWidth
                {...register("email", { required: true, pattern: pattern })}
                autoComplete="email"
                autoFocus
               
              />
               {errors.email && <p style={{ color: 'red' }}>Please check the Email</p>}

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                placeholder="Enter password"
                {...register("password", {
                    required: true,
                    minLength: 6
                })} 
              />
               {errors.password && <p style={{ color: 'red' }}>Please check the Password</p>}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                SignIn
              </Button>
              <GoogleLogin
                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Sign In with Google"
                        onSuccess={onLoginSuccess}
                        onFailure={onLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        prompt="select_account"
                        
                      ></GoogleLogin>
              <Grid container>
                <Grid item xs>
                  <NavLink to={'/photographer'}>
                 PHOTOGRAPHER Click here
                  </NavLink>
                </Grid>
                <Grid item>
                  <NavLink to={'/register'}>
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </div>
  )
}

export default Login