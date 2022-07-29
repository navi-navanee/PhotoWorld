import { IconButton, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editUser_Details, reset } from '../../../features/user/auth/authSlice'
import { toast } from 'react-toastify';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import './profile.css'
import { imageUpload } from '../../../util/imageUpload'
import Spinner from '../../spinner/Spinner'

function UserProfile() {

  const dispatch = useDispatch();

  
  const [Loading, setLoading] = useState(false);
  
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
    );
    const [Pic, setPic] = useState(user ?  user.profile_image : 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=');


  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
  });

  console.log("myrrrrrrrr",user);


  const postDetails = async (ProfilePicture) => {
    try {
      setLoading(true)
      const data = await imageUpload(ProfilePicture);
      setPic(data.secure_url.toString());
      // console.log("im return", image);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };


  const { name, email, } = formData;

  console.log("im the user...............",name ,email);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      profile_image: Pic ? Pic : user.profile_image,
    };
    console.log("im submitted",userData);

    dispatch(editUser_Details(userData))

  };

  if (Loading || isLoading) {
    return <Spinner />;
  }






  return (
    <div>
      <h2>User Profile</h2>

      <div className="card">
        <form onSubmit={onSubmit}>

        
        <div>
          <IconButton color="primary" aria-label="upload picture" component="label">
            Change the Image
            <input hidden accept="image/*" type="file"
              onChange={(e) => postDetails(e.target.files[0])}
            />
            <PhotoCamera />
          </IconButton>
          {user && user.profile_image ? 
           <img className='image'
           src={Pic}
           alt="John" />
       :
       <img className='image'
            src={Pic}
            alt="John" />
        }
         
          
        </div>
        <p className="title"> User Name</p>
        <h1>{user.name}</h1>
      

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField name='name' id="outlined-basic" label="Name" onChange={onChange} value={name} variant="outlined" />
          <TextField name='email' value={email} id="outlined-basic" label="Email" onChange={onChange} variant="outlined" />
          <TextField id="outlined-basic" label="Phonenumber" variant="outlined" />

        </Box>

        <p><button className='button1'>Edit Details</button></p>
       </form>
      </div>

    </div>
  )
}

export default UserProfile