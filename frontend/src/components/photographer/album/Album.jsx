import React, { useState } from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Button, Card, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, ImageListItemBar, Modal, Rating, TextField, Typography } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

import ImageUpload from 'image-upload-react'
import Select from 'react-select';
import { imageUpload } from '../../../util/imageUpload';
import Spinner from '../../spinner/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { albumsSubmit, fetch, fetchAlbum, fetchSuccess } from '../../../features/photographer/details/photographerSlice';
import { useEffect } from 'react';
import { Box } from '@mui/system';

const options = [
    { category: 'wedding', label: 'wedding' },
    { category: 'Helooo', label: 'Heloo' },
    { category: 'vanilla', label: 'Vanilla' },
];

const style = {
    color:"white",
    background:"black",
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Album = () => {
    const [aopen, setaopen] = useState(false)
    const ahandleOpen = (id) => setaopen(true);
    const ahandleClose = () => setaopen(false);
    const dispatch = useDispatch()
    const { albums } = useSelector(fetchAlbum)

    console.log("im the comming data",albums);

    useEffect(() => {
        dispatch(fetch())

    }, [dispatch])


    const [open, setOpen] = React.useState(false);

    const [selectedOption, setSelectedOption] = useState("");
    const { category } = selectedOption;

    // imagee.....

    const [imageSrc, setImageSrc] = useState()
    const [image, setPic] = useState('')
    const [load, setLoad] = useState(false)
    const [albumId,setalbumId]= useState("")


    // dialogue box submit

    const handleClickOpen = () => {
        setOpen(true);
    };
    const submit = () => {
        const data = {
            image,
            category
        }
        console.log(data);
        dispatch(albumsSubmit(data))
        dispatch(fetch())
    }
    const handleClose = () => {
        setOpen(false);
        submit()

    }
    //dump the image into cloudinary ImageUpload
    const postDetails = async (ProfilePicture) => {
        try {
            setLoad(true)
            const data = await imageUpload(ProfilePicture);
            setPic(data.secure_url.toString());
            console.log("im return", image);
            setLoad(false)
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageSelect = (e) => {
        console.log("helooo");
        setImageSrc(URL.createObjectURL(e.target.files[0]))
        postDetails(e.target.files[0])

    }
    

    const deletephoto = (id)=>{
        console.log("im the delet id",id);
        dispatch(deletephoto(id))
       
      }
      const deleteOpen=(id)=>{
        setalbumId(id)
        ahandleOpen()
      }
      

    if (load) {
        return <Spinner />
    }
    return (
        <>
            <Modal
                open={aopen}
                onClose={ahandleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Confirm Action
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <>
                            <div>Are you sure to remove </div>
                        </>
                    </Typography>
                    <div className="content-end mt-3">
                        <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => {
                                ahandleClose();
                            }}
                        >
                            Cancel
                        </Button>{' '}
                        <Button
                            className="delete-confirm-btn"
                            size="small"
                            variant="contained"
                            color="error"
                        onClick={()=>deletephoto(albumId)}
                        >
                            Confirm
                        </Button>
                    </div>
                </Box>
            </Modal>
            <Container>

                <div className='head'>
                    <h2>Review</h2>
                    <div>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Submit your review
                        </Button>
                        <div>
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                maxWidth="sm"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Add Photo "}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Please Add your photo......
                                    </DialogContentText>

                                    <ImageUpload
                                        handleImageSelect={handleImageSelect}
                                        imageSrc={imageSrc}
                                        setImageSrc={setImageSrc}
                                        style={{
                                            width: 200,
                                            height: 200,
                                            background: 'green'
                                        }}
                                    />
                                    <div style={{ marginTop: "2rem" }}>
                                        <Select
                                            defaultValue={selectedOption}
                                            onChange={setSelectedOption}
                                            options={options}
                                        />
                                    </div>

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} autoFocus>
                                        Submit
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </div>
                </div>


                <ImageList
                    gap={12}
                    sx={{
                        mb: 8,
                        gridTemplateColumns:
                            "repeat(auto-fill,minmax(280px,1fr)) !important",

                    }}
                >
                    {
                        albums && albums.map((item) => (
                            <Card key={item.image} sx={{
                                maxWidth: "100%",
                                maxHeight: "100%"
                            }}>
                                <ImageListItem sx={{ height: '100% !import' }}>
                                    <ImageListItemBar
                                        position='top'
                                        sx={{
                                            background:
                                                'linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)',
                                        }}
                                        title={item.category ? item.category : 'NO titlle'}
                                    />
                                    <img
                                        src={item.image}
                                        alt={item.category}
                                        loading="lazy"
                                        style={{ cursor: "pointer" }}
                                        
                                    />
                                    {/* <ImageListItemBar

                                        title={<FavoriteBorderOutlinedIcon />}
                                        subtitle={'1'}

                                    /> */}

                                    <IconButton aria-label="delete">
                                        <DeleteIcon onClick={() =>deleteOpen(item._id)} />
                                    </IconButton>
                                </ImageListItem>
                            </Card>
                        ))
                    }

                </ImageList>
            </Container>
        </>
    )
}

export default Album