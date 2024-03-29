import PhotoCamera from '@mui/icons-material/PhotoCamera'
import './profile.scss'
import { Box, Button, IconButton, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { imageUpload } from '../../../util/imageUpload';
import Spinner from '../../spinner/Spinner';
import { MultiSelect } from 'react-multi-select-component';
import { toast } from 'react-toastify';
import { editPhotographer_Details, reset, } from '../../../features/photographer/auth/photographerauthSlice';


const options = [
    { label: "wedding ", value: "grapes" },
    { label: "Babies&kids", value: "Babies&kids" },
    { label: "Special Occation", value: "Special Occation" },
    { label: "Commercial", value: "Commercial" },
    { label: "Corporative event", value: "Corporative even" },
    { label: "Fashion Portfolio", value: "Fashion Portfolio" },
    { label: "Nature", value: "Nature" },
    { label: "Travel", value: "Travel" },
];


const Profile = () => {

    const [Loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const { photographer, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.photographerauth
    );


    const [Pic, setPic] = useState(photographer ? photographer.image : 'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=');

    console.log("im the pic",Pic);

    const [formData, setFormData] = useState({
        name: photographer.name || '',
        email: photographer.email || '',
        image: photographer.image || '',
        overview: photographer.overview || '',
        address: photographer.address || '',
        city: photographer.city || '',
        state: photographer.state || '',
        phonenumber: photographer.phonenumber || '',
    });
    
    console.log("im the form data",formData);
    const postDetails = async (ProfilePicture) => {
        try {
            setLoading(true)
            const data = await imageUpload(ProfilePicture);
            setPic(data.secure_url.toString());
            setLoading(false)
        } catch (error) {
            return error
        }
    };

    const { name, email, image, overview, address, city, state,phonenumber } = formData;

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
    }, [photographer, isError, isSuccess, message, dispatch]);


    const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name: name,
            email: email,
            image: Pic ? Pic : image,
            category: selected,
            overview: overview,
            address: address,
            city: city,
            state: state,
            phonenumber:phonenumber
        };


        dispatch(editPhotographer_Details(userData))

    };


    // for wedding category

    const [selected, setSelected] = useState(photographer.category)


    if (Loading || isLoading) {
        return <Spinner />;
    }

    return (
        <>
        
        <div>
            <h1 style={{ textAlign: "center", marginTop: "1rem" }}>User Profile</h1>
            <div className="card">
                <form className='form'>
                    <div className='right'>
                        <IconButton color="primary" aria-label="upload picture" component="label">
                            Change the Image
                            <input hidden accept="image/*" type="file"
                                onChange={(e) => postDetails(e.target.files[0])}
                            />
                            <PhotoCamera />
                        </IconButton>
                        {photographer && photographer.image ?
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
                        <h1>{photographer.name}</h1>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '50ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField name='name' id="outlined-basic" label="Name" onChange={onChange} value={name} variant="outlined" />
                            <TextField name='email' id="outlined-basic" label="Email" onChange={onChange} value={email} variant="outlined" />
                            <TextField name='overview' id="outlined-multiline-static" label="Multiline" onChange={onChange} value={overview} multiline rows={3} bdefaultValue="Default Value" />
                            <TextField name='phonenumber' id="outlined-multiline-static" label="phonenumber" onChange={onChange} value={phonenumber} bdefaultValue="Default Value" />
                            <MultiSelect
                                options={options}
                                name='name'
                                value={selected}
                                onChange={setSelected}
                                labelledBy="Select" />
                            <TextField name='address' id="outlined-basic" label="Address" onChange={onChange} value={address} variant="outlined" />
                            <TextField name='city' id="outlined-basic" label="City" onChange={onChange} value={city} variant="outlined" />
                            <TextField name='state' id="outlined-basic" label="State" onChange={onChange} value={state} variant="outlined" />

                        </Box>

                        <Button style={{marginTop:"1rem"}} onClick={onSubmit} variant='contained' size='large'>Edit Details</Button>

                    </div>
                </form>
            </div>

        </div>
        </>
    )
}

export default Profile