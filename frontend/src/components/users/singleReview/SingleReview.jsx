import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Rating, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addReview, fetchReview, ReviewData, singleData } from '../../../features/user/details/userSlice';
import moment from 'moment'
import './review.scss'

const SingleReview = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()

  // const [submit, setSubmit] = useState('')

  const { data } = useSelector(singleData)
  const { user} = useSelector(
    (state) => state.auth
  );

  
  const photographer =data?._id
  
  const [formData, setFormData] = useState({
    review: '',
    star: ''
  })
  const { review, star, } = formData;


  const submit = () => {
    const data = {
      userId:user._id,
      review: formData.review,
      star: formData.star,
      photographerId: photographer
    }
    dispatch(addReview(data))
    dispatch(fetchReview(photographer))
  }

  useEffect(() => {
    
    dispatch(fetchReview(photographer));
    
  }, [dispatch,photographer]);
  
  const fetch =useSelector(ReviewData)

  console.log("the photographer fetchreview ",fetch);
    
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    submit()
  }

  return (
    <div>
      <Container>
        <div className='head'>
          <h2>Review</h2>
          <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              Submit your review
            </Button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Review "}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Please put your valuable review...
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"

                  label="Comment"
                  type="text"
                  fullWidth
                  variant="standard"
                  name='review'
                  value={review}
                  onChange={onChange}
                />
                <Rating
                  name="star"
                  defaultValue={2}
                  value={star}
                  onChange={onChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>

        <div className='review'>
          {
            fetch &&fetch.map((item) => ( 
          <div className='reviews'>
            <div>
              <h1>{item.userId.name}</h1>
            </div>
            <div>{moment(item.date).format(("MMMM Do YYYY"))}</div>
            <div>{item.review}</div>
            <div>
              <Rating name="read-only" value={item.star} readOnly />
            </div>
          </div>
           ))
          }
        </div>
      </Container>
    </div>
  )
}

export default SingleReview