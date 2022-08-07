import { Button, Container, Rating, TextField } from '@mui/material'
import './review.scss'
import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReview, ReviewData } from '../../../features/photographer/details/photographerSlice';
import moment from 'moment'

const Review = () => {
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = useState('')
  const dispatch = useDispatch()

  const photographer = JSON.parse(localStorage.getItem('photographer'))

  const fetch = useSelector(ReviewData)

  const review = fetch.Review

  useEffect(() => {

    dispatch(fetchReview(photographer._id))

  }, [dispatch]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSubmit()
  }


  return (
    <div>
      <Container>
        <h2>Review</h2>
        <div className='review'>
          {
            review && review.map((item) => (
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

export default Review