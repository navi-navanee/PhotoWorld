import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import {
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ImageListItemBar,
  ListSubheader,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import "./album.scss";
import ImageUpload from "image-upload-react";
import Select from "react-select";
import { imageUpload } from "../../../util/imageUpload";
import Spinner from "../../spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  albumsSubmit,
  deletephotos,
  fetch,
  fetchAlbum,
  fetchSuccess,
} from "../../../features/photographer/details/photographerSlice";
import { useEffect } from "react";
import { Box } from "@mui/system";
import InfoIcon from "@mui/icons-material/Info";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const options = [
  { category: "wedding", label: "wedding" },
  { category: "Babies&kids", label: "Babies&kids" },
  { category: "Nature", label: "Nature" },
  { category: "Commercial", label: "Commercial" },
  { category: "Other", label: "Other" },
];

const style = {
  color: "white",
  background: "black",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Album = () => {
  const [aopen, setaopen] = useState(false);
  const ahandleOpen = (id) => setaopen(true);
  const ahandleClose = () => setaopen(false);
  const dispatch = useDispatch();
  const { albums } = useSelector(fetchAlbum);
  const { isDelete } = useSelector((state) => state.photographerDetails);

  useEffect(() => {
    dispatch(fetch());
  }, [dispatch]);

  const [open, setOpen] = React.useState(false);

  const [selectedOption, setSelectedOption] = useState("");
  const { category } = selectedOption;

  // imagee.....

  const [imageSrc, setImageSrc] = useState();
  const [image, setPic] = useState(
    "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="
  );
  const [load, setLoad] = useState(false);
  const [albumId, setalbumId] = useState("");
  const [formData, setFormData] = useState({
    description: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // dialogue box submit

  const handleClickOpen = () => {
    setOpen(true);
  };
  const submit = () => {
    const data = {
      image,
      category,
      description: formData.description,
    };

    dispatch(albumsSubmit(data));

    dispatch(fetch());
  };
  const handleClose = () => {
    setOpen(false);
    submit();
  };
  //dump the image into cloudinary ImageUpload
  const postDetails = async (ProfilePicture) => {
    try {
      setLoad(true);
      const data = await imageUpload(ProfilePicture);
      setPic(data.secure_url.toString());

      setLoad(false);
    } catch (error) {
      return error;
    }
  };

  const deletephoto = (id) => {
    dispatch(deletephotos(id));

    ahandleClose();
  };
  const deleteOpen = (id) => {
    setalbumId(id);
    ahandleOpen();
  };

  if (load) {
    return <Spinner />;
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
            </Button>{" "}
            <Button
              className="delete-confirm-btn"
              size="small"
              variant="contained"
              color="error"
              onClick={() => deletephoto(albumId)}
            >
              Confirm
            </Button>
          </div>
        </Box>
      </Modal>
      <Container>
        <div className="head">
          <h2>Albums</h2>
          <div style={{marginTop:'2rem'}}>
            <Button variant="outlined" onClick={handleClickOpen}>
              Add Your Photo
            </Button>
            <div style={{marginTop:'2rem'}}>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xl"
              >
                <div style={{ width: "36rem" }} className="card">
                  <form className="form" onSubmit={handleClose}>
                    <div
                      style={{ display: "flex", flexDirection: "column" }}
                      className="right"
                    >
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                      >
                        Change the Image
                        <input
                          hidden
                          accept="image/*"
                          type="file"
                          onChange={(e) => postDetails(e.target.files[0])}
                        />
                        <PhotoCamera />
                      </IconButton>
                      {<img className="image" src={image} alt="John" />}
                    </div>
                    <div className="left">
                      <p className="title"> Add Your Photo Here</p>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <div style={{ marginTop: "2rem", zIndex: 2 }}>
                          <Select
                            style={{ zIndex: "2" }}
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                          />
                        </div>
                        <TextField
                          name="description"
                          id="outlined-basic"
                          onChange={onChange}
                          label="description"
                          value={formData.description}
                          multiline
                          rows={4}
                          variant="outlined"
                        />
                      </Box>

                      <p>
                        <button className="button1">Edit Details</button>
                      </p>
                    </div>
                  </form>
                </div>
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
          {albums &&
            albums.map((item) => (
              <Card
                key={item.image}
                sx={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                }}
              >
                <ImageListItem sx={{ height: "100% !import" }}>
                  <ImageListItemBar
                    position="top"
                    sx={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.7)0%, rgba(0,0,0,0.3)70%, rgba(0,0,0,0)100%)",
                    }}
                    title={item.category ? item.category : "NO titlle"}
                  />
                  <img
                    src={item.image}
                    alt={item.category}
                    loading="lazy"
                    style={{ cursor: "pointer" }}
                  />
                  <ImageListItemBar
                    title={<FavoriteBorderOutlinedIcon />}
                    subtitle={"1"}
                  />

                  <IconButton aria-label="delete">
                    <DeleteIcon onClick={() => deleteOpen(item._id)} />
                  </IconButton>
                </ImageListItem>
              </Card>
            ))}
        </ImageList>
      </Container>
    </>
  );
};

export default Album;
