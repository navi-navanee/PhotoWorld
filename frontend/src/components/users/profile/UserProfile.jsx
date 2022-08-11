import { Button, IconButton, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editUser_Details, reset } from '../../../features/user/auth/authSlice'
import { toast } from 'react-toastify';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import './profile.scss'
import { imageUpload } from '../../../util/imageUpload'
import Spinner from '../../spinner/Spinner'

function UserProfile() {

  const dispatch = useDispatch();

  const [Loading, setLoading] = useState(false);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [Pic, setPic] = useState(user ? user.profile_image : '');

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phonenumber: user.phonenumber || ''
  });

  const postDetails = async (ProfilePicture) => {
    try {
      setLoading(true)
      const data = await imageUpload(ProfilePicture);
      setPic(data.secure_url.toString());
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  const { name, email, phonenumber } = formData;
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
      phonenumber
    };
    dispatch(editUser_Details(userData))
  };

  if (Loading || isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>User Profile</h1>
      <div className="userprofile">
        <form className='form' onSubmit={onSubmit}>
          <div className='right'>
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
          <div className='left'>
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
              <TextField name='phonenumber' label="phonenumber" onChange={onChange} value={phonenumber} variant="outlined" />

            </Box>

            <Button className='button1' variant='contained'>Edit Details</Button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default UserProfile